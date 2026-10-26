interface Props { end: number; duration?: number; suffix?: string; prefix?: string; }
export default function Counter({end,suffix="",prefix=""}: Props) { return <span>{prefix}{end.toLocaleString('en-NG')}{suffix}</span>; }
