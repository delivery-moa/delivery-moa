import stlye from "./MenuCard.module.css";
export default function MenuCard({
    id,
    menu_name,
    menu_price,
    menu_image,
}) {
    return (
        <div style={{ padding: "10px" }}>
            <div className={style.menu_card}>
                <img className={style.menu_image} src={menu_image} alt={menu_name} />
                <div className={style.menu_name}>{menu_name}</div>
                <div className={style.menu_price}>{menu_price}</div>
            </div>
        </div>
    );
}