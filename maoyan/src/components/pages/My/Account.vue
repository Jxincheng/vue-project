<template>
	<div class="account">
		<a @click="back()"><i></i></a>
		<div class="login">
			<div class="list">
				<ul>
					<li v-for="(item,index) in loginlist" :key="index" :class='selInit==item?"active":""' @click="toggle(item)">{{item}}</li>
				</ul>
			</div>
			<div v-show="selInit==loginlist[0]">
				<div class="center com">
					<p class="user"><input type="text" name="" placeholder="账户名/手机号/Email"></p>
					<p class="pass"><input type="password" name="" placeholder="请输入您的密码"></p>
				</div>
				<div class="btn"><button class="b1">登录</button></div>
			</div>
			<div v-show="selInit==loginlist[1]">		
				<div class="center2 com">
					<p class="user"><input type="text" name="" placeholder="请输入手机号"><button>获取验证码</button></p>
					<p class="pass2"><input type="text" name="" placeholder="请输入短信验证码"></p>
				</div>
				<div class="btn"><button class="b2">登录</button></div>
			</div>
		</div>
		<ul class="subline">
			<li class="reg">立即注册</li>
			<li class="mi">找回密码</li>
		</ul>
		<footer><p>© 猫眼电影 客服电话：<span>400-670-5335</span></p></footer>		
	</div>
</template>

<script>
export default{
	name:'Account',
	data(){
		return{
			loginlist:['美团账号登录','手机验证登录'],
			selInit:'美团账号登录'
		}
	},
	methods:{
		back(){
			this.$router.go(-1);
		},
		toggle(val){
			this.selInit=val;
		},
		setTitle(){
			let storage=window.localStorage;
			storage.setItem("title","猫眼电影");
		}
	},
	created(){
		// this.$emit('content','猫眼电影');
		this.setTitle();
	}
}
</script>

<style lang="less" scoped>
@import url('../../../styles/main.less');
.account{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 2;
	margin-top: 51.5px;
	.h(615.5);
	background-color: #fff;
	a{
		position: fixed;
		top: 0;
		left: 0;
		display: block;
		.w(22.5);
		.h(51.5);
		.lh(51.5);
		.padding(0,15,0,15);
		i{
			vertical-align: middle;
			position: relative;
			display: inline-block;
			font-style: normal;
			.w(22.5);
			.h(22.5);
		}
		i:before{
			content: '';
		    display: block;
		    position: absolute;
		    left: 3.5px;
		    top: 0;
		    .w(20);
		    .h(20);
		    border-bottom: 2px solid #fff;
		    border-left: 2px solid #fff;
		    transform: scaleY(0.7) rotateZ(45deg);
		}
		i:after{
			content: '';
		    display: block;
		    position: absolute;
		    top: 10px;
		    left: 3px;
		    border-top: 2px solid #fff;
		    height: 0;
		    .w(22);
		}
	}
	.login{
		.w(375);
		.h(190);
		.list{
			.h(38);
			border-bottom: 4px solid #d6d6d6;
			ul{
				.w(355);
				.h(42);
				.padding(0,10,0,10);
				li{
					float: left;
					.h(38);
					.w(177.5);
					text-align: center;
					.lh(38);
					font-weight: 400;
					color: #333;
				}
				.active{
					color: #df2d2d;
					border-bottom: 4px solid #df2d2d;
				}
			}			
		}
		.com{
			.h(86);
			border-bottom: .5px solid #d6d6d6;
			.padding(0,0,0,10);
			p{
				.h(30);
				.padding(6.5,10,6.5,0);
			}
			.user{
				border-bottom: .5px solid #d6d6d6;
			}
			input{
				border-width: 0;
				.h(30);
				.fs(15);
				text-indent: 4px;
			}
			input:focus{
				outline: none;
				background-color: #ececec;
			}
		}
		.center{			
			input{
				width: 100%;				
			}			
		}
		.btn{
			.w(355);
			.h(47);
			margin: 14px 10px;
			button{
				width: 100%;
				height: 100%;
				.fs(20);				
				color: #fff;
				border-radius: 3px;
				border: 0;
			}
			.b1{background-color: #df2d2d;}
			.b2{background-color: #dcdcdc;}
		}		
		.center2{
			.user{
				input{
					.w(245);
					margin-right: 10px;
				}
				button{
					.w(100);
					.h(30);
					border: 0;
					border-radius: 3px;
					color: #999;
				}
			}
			.pass2{
				input{
					width: 100%;
					outline: none;
					background-color: #ececec;
				}
			}
		}		
	}
	.subline{
		overflow: hidden;
		margin: 14px 10px;
		color: #df2d2d;
		.reg{float: left;}
		.mi{float: right;}
	}
	footer{
		margin-top: 15px;
		.padding(0,10,20,10);
		color: #333;
		p{
			text-align: center;
			span{color: #df2d2d;}
		}
	}
}
</style>