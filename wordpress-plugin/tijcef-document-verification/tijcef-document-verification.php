<?php
/**
 * Plugin Name: TIJCEF Document Verification
 * Description: Registers official TIJCEF documents and exposes a privacy-conscious public verification endpoint.
 * Version: 1.0.0
 */
if (!defined('ABSPATH')) exit;

add_action('init', function () {
  register_post_type('tijcef_document', [
    'labels' => ['name'=>'Document Verification','singular_name'=>'Official Document','add_new_item'=>'Register Official Document','edit_item'=>'Edit Official Document'],
    'public'=>false, 'show_ui'=>true, 'show_in_menu'=>true, 'menu_icon'=>'dashicons-shield-alt',
    'supports'=>['title'], 'capability_type'=>'post', 'map_meta_cap'=>true
  ]);
});

add_action('add_meta_boxes', function () {
  add_meta_box('tijcef_doc_details','Verification Details','tijcef_doc_box','tijcef_document','normal','high');
});
function tijcef_doc_box($post) {
  wp_nonce_field('tijcef_doc_save','tijcef_doc_nonce');
  $fields=['document_id'=>'Document ID','document_type'=>'Document Type','holder'=>'Recipient / Holder','issue_date'=>'Issue Date','status'=>'Status','token'=>'Secure Verification Token'];
  foreach($fields as $key=>$label){ $v=get_post_meta($post->ID,'_'.$key,true); echo '<p><label><strong>'.esc_html($label).'</strong></label><br>';
    if($key==='status'){ echo '<select name="'.$key.'">'; foreach(['Valid','Revoked','Expired','Superseded'] as $o) echo '<option '.selected($v,$o,false).'>'.$o.'</option>'; echo '</select>'; }
    else echo '<input style="width:100%;max-width:650px" name="'.$key.'" value="'.esc_attr($v).'" '.($key==='token'?'readonly':'').'>';
    echo '</p>'; }
  $token=get_post_meta($post->ID,'_token',true); if($token) echo '<p><strong>Verification URL</strong><br><code>'.esc_html('https://tijcef.org/verify?token='.$token).'</code></p>';
}

add_action('save_post_tijcef_document', function($post_id){
  if(!isset($_POST['tijcef_doc_nonce']) || !wp_verify_nonce($_POST['tijcef_doc_nonce'],'tijcef_doc_save') || !current_user_can('edit_post',$post_id) || (defined('DOING_AUTOSAVE')&&DOING_AUTOSAVE)) return;
  foreach(['document_id','document_type','holder','issue_date','status'] as $key) if(isset($_POST[$key])) update_post_meta($post_id,'_'.$key,sanitize_text_field(wp_unslash($_POST[$key])));
  if(!get_post_meta($post_id,'_token',true)) update_post_meta($post_id,'_token',wp_generate_password(32,false,false));
},10,1);

add_action('rest_api_init', function(){
  register_rest_route('tijcef/v1','/verify',['methods'=>'GET','permission_callback'=>'__return_true','callback'=>function($req){
    $code=sanitize_text_field($req->get_param('code')); if(!$code) return new WP_REST_Response(['valid'=>false],400);
    $q=new WP_Query(['post_type'=>'tijcef_document','post_status'=>'publish','posts_per_page'=>1,'meta_query'=>['relation'=>'OR',['key'=>'_document_id','value'=>$code,'compare'=>'='],['key'=>'_token','value'=>$code,'compare'=>'=']]]);
    if(!$q->have_posts()) return new WP_REST_Response(['valid'=>false],404);
    $id=$q->posts[0]->ID; $status=get_post_meta($id,'_status',true) ?: 'Valid';
    return new WP_REST_Response(['valid'=>true,'document_id'=>get_post_meta($id,'_document_id',true),'document_type'=>get_post_meta($id,'_document_type',true),'holder'=>get_post_meta($id,'_holder',true),'issue_date'=>get_post_meta($id,'_issue_date',true),'status'=>$status],200);
  }]);
});
