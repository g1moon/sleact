import React, {useCallback, useState} from 'react';
// import useInput from '@hooks/useInput';
import {Success, Form, Error, Label, Input, LinkContainer, Button, Header} from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import useSWR from 'swr';

function Login() {
    //fetcher = //url을 받아서 -> 거기에 get요청을 보내고 -> 결과값을 리턴한다
    ///api/users :  내 로그인 정보를 가져옴, 로그인되어있지 않으면 false
    //즉 로그인을 확인하는 작업
    const {data, error, revalidate, mutate} = useSWR('/api/users', fetcher);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logInError, setLogInError] = useState(false);
    const [logInSuccess, setLoginSuccess] = useState(false);

    const onSubmit = useCallback((e) => {
            e.preventDefault();
            setLogInError(false);
            setLoginSuccess(false);

            //아이디 비번 입력하고 -> 서버로 넘겨서 -> 정보가 맞으면 -> 로그인 정보 생김
            //이때 다시 SWR이 api/uses에게 로그인 확인
            axios
                .post('/api/users/login', {email, password})
                .then((res) => {
                    setLoginSuccess(true);
                    revalidate(); //다시 useSWR 부분으로
                })
                .catch((err) => {
                    setLogInError(err.response?.data?.statusCode === 401);
                });
        }
        , [email, password]);


    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);

    }, []);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    //처음에 data false여서
    if (data === undefined) {
        return <div>로딩중...</div>
    }

    if (data) { //Is is mean that the login status is true
        return <Redirect from='/login' to='/workspace/channel'/>
        // return <div>saksdjf</div>;
    }

    return (
        <div id="container">
            <Header>Sleact</Header>
            <Form onSubmit={onSubmit}>
                <Label id="email-label">
                    <span>이메일 주소</span>
                    <div>
                        <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail}/>
                    </div>
                </Label>
                <Label id="password-label">
                    <span>비밀번호</span>
                    <div>
                        <Input type="password" id="password" name="password" value={password}
                               onChange={onChangePassword}/>
                    </div>
                    {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
                </Label>
                <Button type="submit" onClick={onSubmit}>로그인</Button>
            </Form>
            <LinkContainer>
                아직 회원이 아니신가요?&nbsp;
                <Link to="/signup">회원가입 하러가기</Link>
            </LinkContainer>
        </div>
    );
}

export default Login;