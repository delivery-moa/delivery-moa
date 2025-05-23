import supabase from '../../config/supabaseClient'
import style from './ChatCard.module.css'

export default function Chat({
	id, 
	user_id, 
	chat,
	created_at
}){
	let { data: user, error } = supabase
	 	.from('user')
		.select('*')
		.eq('id', user_id)
		.single();
	user = user || { nickname: 'Unknown' };
	const date = new Date(created_at);
	let hours = `${date.getHours()}`;
	if (hours.length < 2) {
		hours = '0' + hours;
	}
	let minutes = `${date.getMinutes()}`;
	if (minutes.length < 2) {
		minutes = '0' + minutes;
	}
	let seconds = `${date.getSeconds()}`;
	if (seconds.length < 2) {
		seconds = '0' + seconds;
	}	

	return (
		<div className={style.chat}>
			<span className={style.chat_box} key={id}>
				<b>{user.nickname}</b>
				<div>{chat}</div>
			</span>
			<span className={style.date}>{`${hours}:${minutes}:${seconds}`}</span>
		</div>
	);
}
