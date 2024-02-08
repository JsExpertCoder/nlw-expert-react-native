import { Link, LinkProps } from "expo-router"
type linkButtonProps = LinkProps<string> & {
  title: string
}

export function LinkButton({ title, ...rest }: linkButtonProps ) {
  return (
    <Link className="text-slate-300 text-center text-base font-bold" {...rest}>
      { title }
    </Link>
  )
} 