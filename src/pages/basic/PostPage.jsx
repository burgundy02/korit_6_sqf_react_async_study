import React from 'react';
import { Link } from 'react-router-dom';
import { BASIC_MENU } from '../../constants/basicMenu';
import Sidebar from '../../components/Sidebar/Sidebar';
import useInput from '../../hooks/useInput';
import axios from 'axios';

function PostPage(props) {
    const schoolNameInput = useInput();
    const departmentInput = useInput();
    const gradeInput = useInput();
    const nameInput = useInput();

    const schoolNameInput2 = useInput();
    const numberInput = useInput();
    const addressInput = useInput();
    const nameInput2 = useInput();

    const handleSubmit = () => {
        const student = {
            schoolName : schoolNameInput.value,
            department : departmentInput.value,
            grade : gradeInput.value,
            name : nameInput.value,
        }

        // fetch("http://localhost:8080/basic/student", {
        //     method: "post",
        //     headers: {
        //         "Content-type": "application/json"
        //     },
        //     body: JSON.stringify(student)
        // }).then(response => {
        //     response.json().then(responseData => {
        //         console.log(responseData);
        //     })
        // })

        // 기본형태 json으로 보냄
        axios.post("http://localhost:8080/basic/student", student)
        .then(response => {
            console.log(response.data); // 객체가 들어있는 곳
        }).catch(error => {
            console.log(error);
        });
    }

    const handleSubmit2 = () => {
        const teacher = {
            schoolName : schoolNameInput.value,
            number : numberInput.value,
            address : addressInput.value,
            name : nameInput.value,
        }

        // 기본형태 json으로 보냄
        axios.post("http://localhost:8080/basic/teacher", teacher)
        .then(response => {
            console.log(response.data); // 객체가 들어있는 곳
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <>
            <header>
                <h1>비동기 데이터 통신(POST)</h1>
            </header>
            <main>
                <h3>학생정보</h3>
                <p>
                    <label htmlFor="">학교명: </label>
                    <input type="text" 
                        onChange={schoolNameInput.onChange} 
                        value={schoolNameInput.value}/>
                </p>
                <p>
                    <label htmlFor="">학과명: </label>
                    <input type="text" 
                        onChange={departmentInput.onChange} 
                        value={departmentInput.value}/>
                </p>
                <p>
                    <label htmlFor="">학년: </label>
                    <input type="text" 
                        onChange={gradeInput.onChange} 
                        value={gradeInput.value}/>
                </p>
                <p>
                    <label htmlFor="">이름: </label>
                    <input type="text" 
                        onChange={nameInput.onChange} 
                        value={nameInput.value}/>
                </p>
                <p>
                    <button onClick={handleSubmit}>전송</button>
                </p>

                <h3>선생님정보</h3>
                <p>
                    <label htmlFor="">학교명: </label>
                    <input type="text" 
                        onChange={schoolNameInput2.onChange} 
                        value={schoolNameInput2.value}/>
                </p>
                <p>
                    <label htmlFor="">연락처: </label>
                    <input type="text" 
                        onChange={numberInput.onChange} 
                        value={numberInput.value}/>
                </p>
                <p>
                    <label htmlFor="">주소: </label>
                    <input type="text" 
                        onChange={addressInput.onChange} 
                        value={addressInput.value}/>
                </p>
                <p>
                    <label htmlFor="">이름: </label>
                    <input type="text" 
                        onChange={nameInput2.onChange} 
                        value={nameInput2.value}/>
                </p>
                <p>
                    <button onClick={handleSubmit2}>전송</button>
                </p>
            </main>
        </>
    );
}

export default PostPage;