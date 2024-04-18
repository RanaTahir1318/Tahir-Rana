export interface ILoaderProps {}
import style from "./Loader.module.css";

export default function Loader(props: ILoaderProps) {
	return <div className={style.loading}></div>;
}
