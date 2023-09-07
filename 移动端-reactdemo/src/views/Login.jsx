import {Form,Input,Toast} from "antd-mobile" 
import NavBarAgain from "../components/NavBarAgain";
import "./style/Login.less"
import {useState,useEffect} from "react"
import {sendCode,login} from "../api"
import ButtonAgain from "../components/ButtonAgain";
import _ from "../assets/utils"
import {connect} from "react-redux"
import action from "../store/actions"
// 校验手机和验证码
const validate = {
    phone:(_, value) => {
       value = value.trim()
       let reg = /^(?:(?:\+|00)86)?1\d{10}$/
       if(value.length === 0) {
        return Promise.reject(new Error('手机号不能为空!'))
        };
       if (!reg.test(value)) {return Promise.reject(new Error('手机号格式有误!'))};
       return Promise.resolve()
        
    },
    code:(_,value)=>{
       value = value.trim()
       let reg = /^\d{6}$/
       if(value.length===0)return Promise.reject(new Error('验证码不能为空!'));
       if (!reg.test(value))return Promise.reject(new Error('验证码格式有误!'));
       return Promise.resolve()
    }

}

function Login(props){
    let {getInfo,router} = props
    const [formIns] = Form.useForm()
    let [disabled,setDisabled] = useState(false), // 按钮禁用状态
        [sendText,setSendText] = useState("发送验证码"); // 发送验证码的文字
    
    /* 发送验证码 */
    let timer = null,
        num = 30; // 倒计时秒数
    const countDowm =()=>{
        num--;
        if(num===0){
            clearInterval(timer)
            timer = null
            setSendText(`发送验证码`)
            setDisabled(false)
            return;
        }
        setSendText(`${num}秒后重发`)
    }
    const send = async ()=>{
        try{
            await formIns.validateFields(['phone'])
            // 手机号校验成功，发起请求🙏
            let phone = formIns.getFieldValue("phone")
            let {code} = await sendCode(phone)
            if(+code !== 0){
                Toast.show({
                    content:"发送失败",
                    icon:'fail'
                })
            }
            setDisabled(true) // 发送成功验证码后，禁用按钮
            countDowm()
            if(!timer){
                timer = setInterval(countDowm,1000)
            }
        }catch(_){
            console.log("e",_)
        }
    }
    const submit = async()=>{ 
        try{
            await formIns.validateFields()
            let {phone,code} = formIns.getFieldsValue()
            let {code:codeHttp, token} = await login(phone,code)
            if(+codeHttp!==0){
                Toast.show({
                    content:"登录失败",
                    icon:"fail"
                })
                // 清除验证码
                formIns.resetFields(['code'])
                return;
            }
            // 存储(token),存储redux(info),跳转
            _.storage.set('tk',token)
            // 获取个人信息并存储在redux中
            await getInfo()
            Toast.show({
                content:"登陆成功",
                icon:"success"
            })
            // 回到用户上一次浏览器的地方
            let to = router.usp.get("to")
            console.log("to",to)
            to ? router.navigate(to,{replace:true}) : router.navigate("/")
        }catch(_){
            console.log("e",_)
        }
    }
    useEffect(()=>{ // 销毁定时器
        return ()=>{
            if(timer){
                clearInterval(timer)
                timer = null
            }
        }
    },[])
    return <div className='login-box'>
    <NavBarAgain title="登录/注册" />
    <Form
        layout='horizontal'
        style={{ '--border-top': 'none' }}
        footer={
            <ButtonAgain color='primary' onClick={submit} >
                提交
            </ButtonAgain>
        }
        form={formIns}
        requiredMarkStyle={false}
        initialValues={{ phone: '', code: '' }}
    >
        <Form.Item name='phone' label='手机号' rules={[{ validator: validate.phone }]}>
            <Input placeholder='请输入手机号' />
        </Form.Item>

        {/* 按钮状态：1.防抖状态，2.loading效果，3.时间状态，4.按钮是否可点击状态 */}
        <Form.Item name='code' label='验证码'
        rules={[ { validator: validate.code }]}
            extra={
                <ButtonAgain disabled={disabled}  size='small' color='primary' onClick = {send}>
                    {sendText}
                </ButtonAgain>
            }
        >
            <Input />
        </Form.Item>
    </Form>
</div>;
}
export default connect(null,action.base)(Login);