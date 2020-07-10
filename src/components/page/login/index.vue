<template>
	<div class="login_page">
		<!-- 登录盒子 -->
		<div class="login_box">
			<div class="login_box_title">校园购物</div>
			<!-- 登录输入框 -->
			<el-form :model="login" ref="login" :rules="loginrule" class='login_form'>
				<el-form-item  prop="username" >
					<el-input v-model="login.username" placeholder="请输入账号">
						<el-button slot="prepend" icon="el-icon-user"></el-button>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" v-model="login.password" placeholder="请输入密码" >
						<el-button slot="prepend" icon="el-icon-lock"></el-button>
					</el-input>
				</el-form-item>
				<!-- 验证码 -->
				<el-form-item >
					<div class="login_box_cell">
						<div class="login_box_cell_left">
							验证码：
							<input type="text" class="captcha_input" v-model="captchatext">
							<div class="captcha" @click="updatecode">{{captcha}}</div>
						</div>
						<div class="login_box_cell_right">
							<el-checkbox v-model="checked">记住密码</el-checkbox>
						</div>
					</div>
				</el-form-item>
				<!-- 登录按钮 -->
				<el-form-item>
					<el-button type="primary" class="login_box_btn" @click="loginsubmit()" >登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {login, register} from "@/api/login.js"
	import {setToken, removeToken} from "@/utils/auth.js"
  
	export default {
		name: "login",
		data(){
			return {
				// 检验参数
				login:{
					username: "",
					password: ""
				},
				// 校验规则
				loginrule:{
					username:[{required: true, message:'请输入账号', trigger: 'blur'}],
					password:[{required: true, message:'请输入密码', trigger: 'blur'}],
				},
				// 生成的验证码
				captcha:'',
				// 输入的验证码
				captchatext:'',
				// 记住密码
				checked: false,
			}
		},
		created() {
			// 清除token
			removeToken()
			// 调用是否记住密码
			this.judgeChecked()
			// 调用生成验证码
			this.createcode()
		},
		methods:{
			// 判断是否记住密码
			judgeChecked(){
				if (localStorage.getItem("ms_username") && localStorage.getItem("ms_password")) {
					this.login.username = localStorage.getItem("ms_username")
					this.login.password = localStorage.getItem("ms_password")
					this.checked = true
				}	
			},
			// 生成验证码
			createcode(){
				const radom = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h",
				"i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
				for (let i = 0; i < 4; i++) {
					let index = Math.floor(Math.random()*36)
					this.captcha += radom[index]
				}
			},
			// 更新验证码
			updatecode (){
				this.captcha = ''
				this.createcode()
			},
			// 登录点击
			loginsubmit(){
				// 账号密码登录校验
				this.$refs.login.validate(loginvalid => {
					if (loginvalid) {
						// 校验验证码
						if (this.captchatext.toLowerCase() == this.captcha) {
							// 获取账号密码
							var data = {
								username: this.login.username,
								password: this.login.password
							}
							// 登录
							login(data).then(res => {
								if (res.code == 0) {
									// 登录提示
									this.$message.success('登录成功')
									// 记住密码
									if (this.checked == true) {
										localStorage.setItem('ms_username', this.login.username)
										localStorage.setItem('ms_password', this.login.password)
									}
									// 缓存所有数据
									var data = JSON.stringify(res.data)
									localStorage.setItem("ms_userinfo", data)
									// 缓存token
									setToken(res.token)
									// 登录成功跳转
									this.$router.push('/');
								} else {
									this.$message.error(res.msg)
								}
							})
						} else {
							this.$message.error('验证码错误')
							return false
						}
					} else {
						this.$message.error('请输入账号和密码')
						return false
					}
				})
			}
		}
	}
</script>

<style scoped>
  .login_page{
    width: 100%;
    height: 100vh;
    background: url("./../../../assets/img/login-bg.jpg");
    background-size: 100% 100%;
    position: relative;
  }
  .login_box{
    position: absolute;
    width: 400px;
    /* height: 300px; */
    background: rgba(255, 255, 255, 0.5);
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -150px;
    border-radius: 10px;
  }
  .login_box_title{
    width: 100%;
    border-bottom: 2px solid #FFFFFF;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000000;
    font-size: 20px;
  }
  .login_form{
    padding: 10px;
  }
  .login_box_cell{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
  }
  .login_box_cell_left{
    flex: 1;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #606266;
  }
  .captcha{
    width: 60px;
    height: 24px;
    background: #66b1ff;
    color: #FFFFFF;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    letter-spacing: 1px;
  }
  .captcha_input{
    width: 20%;
    height: 15px;
    padding: 3px;
  }
  .login_box_cell_right{
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-size: 17px;
    color: #00000;
  }
  .login_box_btn{
    width: 80%;
    margin-left: 10%;
  }
  .btncolor{
    background: #39b868;
  }
</style>
