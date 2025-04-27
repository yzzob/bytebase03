// 使用 Express 示例代码
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const clientId = 'Ov23li1sZQXhfBHfs9yJ';
const clientSecret = '05dcb2696097b650820a75668c43294c256013d6';  // 注意生产环境不能暴露！
const redirectUri = 'http://localhost:5173'; // 必须和GitHub OAuth设置一致
app.use(cors());  // 新增
app.use(express.json());  // 新增
app.post('/github-login', async (req, res) => {
const { code } = req.body;
try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: redirectUri
    }, {
    headers: {
        'Accept': 'application/json'
    }
    });

    if (response.data.access_token) {
        // 获取用户信息
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${response.data.access_token}`,
            },
        });
        res.json({
            access_token: response.data.access_token,
            avatar_url: userResponse.data.avatar_url,
            login: userResponse.data.login
        });
        console.log('GitHub login successful');
    } else {
    res.status(400).send('Error getting access token');
    console.log('Error getting access token');
    }
} catch (error) {
    res.status(500).send('Error communicating with GitHub');
}
});

app.listen(3000, () => {
console.log('Server running on http://localhost:3000');
});
