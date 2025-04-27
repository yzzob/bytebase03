import React, { useEffect, useState } from 'react';
import { Button, Box, Container, CssBaseline, Typography, Divider, TextField } from '@mui/material';
import './login.css';

interface GitHubUser {
    login: string;
    avatar_url: string;
}

function LoginForm() {
const [email, setEmail] = useState('');
const [userInfo, setUserInfo] = useState<GitHubUser | null>(null);

/**
 * 触发 GitHub OAuth 登录流程，跳转到 GitHub 授权页面
 */
const handleGitHubLogin = () => {
    const clientId = 'Ov23li1sZQXhfBHfs9yJ';
    const redirectUri = 'http://localhost:5173';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
};

/**
 * 页面加载后：
 * - 从 localStorage 读取保存的 GitHub 用户信息
 * - 如果 URL 中有 code，发送请求交换用户信息
 */
useEffect(() => {
    const savedUser = localStorage.getItem('githubUser');
    if (savedUser) {
        setUserInfo(JSON.parse(savedUser));
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code && !userInfo) {
        fetch('http://localhost:3000/github-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code })
        })
        .then(res => res.json())
        .then(user => {
            setUserInfo({
                login: user.login,
                avatar_url: user.avatar_url,
            });
            localStorage.setItem('githubUser', JSON.stringify({
                login: user.login,
                avatar_url: user.avatar_url
            }));
        })
    }
}, [userInfo]);

/**
 * 退出登录：
 * - 清除用户信息
 * - 清除 localStorage
 * - 清除 URL 中的 code 参数
 */
const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem('githubUser');
    window.history.replaceState({}, document.title, window.location.pathname);
};

/**
 * 提交邮箱登录表单，模拟登录
 */
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`模拟邮箱登录: ${email}`);
};

return (
    <Container component="main" maxWidth="xs" sx={{
        padding: '16px',
        '@media (max-width: 600px)': {
            padding: '8px',
            maxWidth: '100%'
        }
    }}>
    {userInfo && (
        <Box sx={{ 
            mt: 4, 
            textAlign: 'center',
            '@media (max-width: 600px)': {
                mt: 2
            }
        }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                欢迎！
            </Typography>
            <img
            src={userInfo.avatar_url}
            alt="GitHub头像"
            style={{ width: 80, height: 80, borderRadius: '50%' }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
            {userInfo.login}
            </Typography>
        </Box>
    )}
    <CssBaseline />
    <Box
        sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '@media (max-width: 600px)': {
            marginTop: 4
        }
        }}
    >
        <Box
        component="img"
        sx={{ 
            width: 243.75, 
            height: 52, 
            objectFit: 'contain',
            '@media (max-width: 600px)': {
                width: '80%',
                height: 'auto'
            }
        }}
        alt="Bytebase Logo"
        src="https://www.bytebase.com/images/logo.svg"
        
        ></Box>
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
        欢迎
        </Typography>

        <Typography sx={{ mt: 1, fontSize: '0.8rem' }}>
            登录 Bytebase 以继续使用 Bytebase Hub。
        </Typography>
        <br/>
        <Button
            type="submit"
            data-provider="github"
            data-action-button-secondary="true"
            className="runjs-1"
            onClick={handleGitHubLogin}
            sx={{
                '@media (max-width: 600px)': {
                    width: '100%'
                }
            }}
            >
            <span data-provider="github" className="runjs-2"></span>

            <span className="runjs-3">继续使用 GitHub</span>
        </Button>
        <Divider sx={{ my: 2, mb:0, width: '100%' }}>
            <Typography variant="body2" color="text.secondary">
                或
            </Typography>
        </Divider>

        {/* 邮箱登录表单 */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ 
            mt: 1,
            width: '100%',
            '@media (max-width: 600px)': {
                mt: 0.5
            }
        }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="电子邮件地址"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#4F46E5', height: 52 }}
        >
            继续
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Typography variant="body2">
                没有账号
            </Typography>
            <Typography 
                variant="body2" 
                sx={{ color: '#4F46E5', ml: 1, cursor: 'pointer' }}
                onClick={() => {/* 添加注册跳转逻辑 */}}
            >
                去注册
            </Typography>
        </Box>
        <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={handleLogout}
            fullWidth
        >
            退出登录
        </Button>
        {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#4F46E5', height: 52 }}
            oncli
        >
            登出
        </Button> */}
        </Box>

    </Box>
    </Container>
);
}

export default LoginForm;
