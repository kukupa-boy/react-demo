import "./index.less"
import { useMemo,useEffect} from "react";
import {connect} from "react-redux"
import Action from "../../store/actions";
import {useNavigate} from "react-router-dom"
function HomeHead(props) {
    let navigate = useNavigate()
    let {today,base:{info},getInfo} = props; // 保证传递进来的是八位的年月日
    
    let time = useMemo(()=>{// 逻辑比较复杂，变化后才计算，没有变化都进行缓存
        let [,,month,day] = today.match(/(\d{4})(\d{2})(\d{2})/);
        const arr = ["","一月","二月","三月","四月","五月","六月","七月","八月", "九月","十月","十一月","十二月"];
        month = arr[+month];
        return {
            month,
            day
        }
    },[today])

    useEffect(()=>{ // 没有图片进行派发，然后更新组件
      if(!info?.pic){
        getInfo()
      }
    },[])

  return (
    <div className="com_home-head">
      <div className="info">
        <div className="time">
            <span>{time.day}</span>
            <span>{time.month}</span>
        </div>
        <h2 className="title">知乎日报</h2>
      </div>
      <div className="picture" onClick={()=>{
        navigate("/Personal")
      }}>
        {/* 
            css视图通过相对路径获取静态图片成功：cssloader会将相对路径转换为正确的路径
            jsx视图通过相对路径获取静态图片失败：webpack编译后图片相对路径变化了
            解决一：使用绝对地址（http://）
            解决二：基于esmodule导入图片(使用require导入图片),图片会被编译成base64格式
        */}
        <img src={info?.pic?info.pic:require("../../assets/images/timg.jpg")} alt="" />
      </div>
    </div>
  )
}
export default connect(state=>state,Action.base)(HomeHead)