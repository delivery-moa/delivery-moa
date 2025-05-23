import supabase from "../../config/supabaseClient";

export default function MenuList({
    store_id,
}) {
    const { data: menus, error } = supabase
        .from("menu")
        .select("*")
        .eq("store_id", store_id);

    return (
        <div>
            {menus.map((menu) => (
                <MenuCard
                    key={`${menu.store_id}-${menu.id}`}
                    id={menu.id}
                    store_id={menu.store_id}
                    menu_name={menu.menu_name}
                    menu_price={menu.menu_price}
                    menu_image={menu.menu_image}
                    created_at={menu.created_at}
                />
            ))}
        </div>
    );
}
