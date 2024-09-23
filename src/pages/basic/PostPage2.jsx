import React, { useEffect, useState } from 'react';
import { COLOR_OPTIONS, SIZE_OPTIONS } from '../../constants/productOptions';
import axios from 'axios';

function PostPage2(props) {
    const [product, setProduct] = useState({   
        productName: "",                // 이 객체가 초기값(key, value들이 하나의 객체)
        price: "",                      // 얘네 키 값이 ReqProductDto에 들어감
        sizeId: "",
        colorId: "",
    });

    const [ sizeOptions, setSizeOptions] = useState([]);
    const [ colorOptions, setColorOptions] = useState([]);

    // page가 로드되어졌을 때 사용
    useEffect( () => {   
        const getSizes = async () => {
            const response = await axios.get("http://localhost:8080/api/v1/sizes");
            setSizeOptions(response.data);
            setProduct(product => ({
                    ...product,
                    sizeId: response.data[0].sizeId
             }));
        }

        const getColors = async () => {
            const response = await axios.get("http://localhost:8080/api/v1/colors");
            setColorOptions(response.data);
            setProduct(product => ({
                ...product,
                colorId: response.data[0].colorId
            }));
        }

        getSizes();
        getColors();

    }, []);  // 처음의 한 번만 동작(처음 로드됐을 때 한 번만)

    const handleInputChange = (e) => {
        setProduct(product => {         // 위의 product를 매개변수로 들고올 수 있음
            return {
                ...product,             
                [e.target.name]: e.target.value    // input에 입력한 것(value)을 넣음
            }
        });
    }

    const handleSubmitClick = async () => {
        try {                                           // promise
            const responce = await axios.post("http://localhost:8080/api/v1/product", product);   // await은 프로미스 앞에만 달 수 있다 : 갔다 온 응답 데이터를 responce에 줌(하나의 then) => 응답은 dto에서 해주고 있는 리턴
            console.log(responce);      // responce에는 promise의 실행 결과가 들어감
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <header>
                <h1>비동기 데이터 통신(POST2)</h1>
            </header>
            <main>
                <h3>상품등록</h3>
                <p>
                    <label htmlFor="">상품명</label>
                    <input type="text" 
                        name="productName"      // e.target.name 
                        onChange={handleInputChange}
                        />
                </p>
                <p>
                    <label htmlFor="">가격</label>
                    <input type="text" 
                        name="price"
                        onChange={handleInputChange}
                        />
                </p>
                <p>
                    <label htmlFor="">사이즈</label>
                    <select name="sizeId" onChange={handleInputChange} value={product.sizeId}>
                            {
                                sizeOptions.map(size =>  
                                <option key={size.sizeId} value={size.sizeId}>{size.sizeName}</option>)
                            }
                           
                    </select>
                </p>
                <p>
                    <label htmlFor="">색상</label>
                    <select name="colorId" onChange={handleInputChange} value={product.colorId}>
                            {
                                colorOptions.map(color => 
                                    <option key={color.colorId} value={color.colorId}>{color.colorName}</option>)
                            }
                    </select>
                </p>
                <p>
                    <button onClick={handleSubmitClick}>등록하기</button>
                </p>
            </main>
        </>
    );
}

export default PostPage2;