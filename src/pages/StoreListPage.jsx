import styles from "./StoreListPage.module.css";
import { useState, useEffect, useRef } from "react";
import supabase from "../config/supabaseClient";
import { Link } from "react-router-dom";

export default function StoreListPage() {

    const [store, setStore] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const categoryRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {

            const [{ data:categoryData, error:categoryError }, { data:storeData, error:storeError }] = await Promise.all([
                supabase.from("menu_category").select("id, category").order("num"),
                supabase.from("store").select("*")
            ]);

            if (categoryError) {
                console.error("카테고리 불러오기 오류: ", categoryError);
            } else {
                setCategories(categoryData);
            }
            if (storeError) {
                console.error("스토어 불러오기 오류:", storeError);
            } else {
                setStore(storeData);
            }
        };
        fetchCategories();
    }, []);

    const storeClick = (e, id) => {
        console.log("store clicked:", id);
    }

    // 가게 필터링
    const filteredStores = selectedCategoryId && selectedCategoryId !== "ALL"
        ? store.filter((item) => item.category_id === selectedCategoryId)
        : store;

    // 버튼 스크롤
    const scrollRight = () => {
        if (categoryRef.current) {
            categoryRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    const scrollLeft = () => {
        if (categoryRef.current) {
            categoryRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const storeUrl = "https://epfwvrafnhdgvyfcrhbo.supabase.co/storage/v1/object/public/imgfile/store/store_";
    const imgBaseUrl = "https://epfwvrafnhdgvyfcrhbo.supabase.co/storage/v1/object/public/imgfile/category/";
    return (
        <>
            <div className={styles["storelist_body"]}>
                <div className={styles["circle_category_outer"]}>
                    <button className={styles["scroll_button"]} onClick={scrollLeft}>
                        <img src="https://epfwvrafnhdgvyfcrhbo.supabase.co/storage/v1/object/public/imgfile/main_img/backbtn.png" />
                    </button>
                    <div className={styles["circle_category_wrap"]} ref={categoryRef}>
                        {categories.map((item) => (
                            <div key={item.id}
                                onClick={() => setSelectedCategoryId(item.id)}>
                                <div className={styles["circle_with_text"]}>
                                    <div className={styles["circle"]}>
                                        <img
                                            src={`${imgBaseUrl}${item.id}.png`}
                                            alt={`${item.category} 이미지`} />
                                    </div>
                                    <div className={styles["circle_text"]}>{item.category}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className={styles["scroll_button"]} onClick={scrollRight}>
                        <img src="https://epfwvrafnhdgvyfcrhbo.supabase.co/storage/v1/object/public/imgfile/main_img/backbtn2.png" />
                    </button>
                </div>




                <div className={styles["second_body"]}>
                    <div className={styles["storelist_wrap"]}>
                        {filteredStores.length > 0 ? (
                            filteredStores.map((item) => (
                                <Link key={item.id} to={`/store/${item.id}`} onClick={(e) => storeClick(e, item.id)}>
                                    <div className={styles["img_explain_wrap"]}>
                                        <div className={styles["storesquare_img"]}>
                                            <img src={`${storeUrl}${item.id}.jpg`} />
                                        </div>
                                        <div className={styles["storeexplain"]}>
                                            <h2> {item.store_name} </h2>
                                            <h4> 가게위치 {item.store_address} </h4>
                                            <h5> 배달비 : <span className={styles["deliveryfree"]}> 무료배달 </span></h5>
                                            <h5> 최소주문 {item.min_price}원 </h5>

                                        </div>
                                    </div>
                                </Link>
                            ))

                        ) : (
                            <div className={styles.room_no_result}>
                                주문 가능한 가게가 없습니다.
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
};
