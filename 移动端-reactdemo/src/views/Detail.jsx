import "./style/Detail.less"
import {getNewsDetail,getStoryExtra,collectNews,cancelCollect} from "../api"
import {useEffect,useState,useMemo} from "react"
import { useNavigate,useParams,useLocation } from "react-router-dom"
import SkeletonAgain from "../components/SkeletonAgain"
import {Toast,Badge} from "antd-mobile"
import {LeftOutline,MessageOutline,LikeOutline,StarOutline,MoreOutline} from "antd-mobile-icons"

import {flushSync} from "react-dom"
import {connect} from "react-redux"
import action from "../store/actions"
function Detail(props){
    console.log("props",props)
    
    // 新闻展示 ---------
    let [detail,setDetail] = useState(null),
        link,
        [extra,setExtra] = useState(null);
    let navigate = useNavigate()
    let location = useLocation()
    let {id} = useParams();
    const toPath = ()=>{
        navigate(-1)
    }
    const handleStyle = (result)=>{
        if(!Array.isArray(result.css))return
        let css =result.css[0] // 如何渲染给当前组件呢：动态创建link标签导入样式
        if(!css) return 
        link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = css
        document.head.appendChild(link)
    }
    const handleImage = (result)=>{
        // 动态创建image标签，放入图片到拿回来的html容器中
        if(!result) return
        let { images } = result
        if(!Array.isArray(images))return
        let ele = document.querySelector(".img-place-holder")
        // let hand = document.querySelector(".headline")
        // hand.style.height = "750px"
        if(!ele)return
        let imgEl= new Image()
        imgEl.src= images[0]
        imgEl.style.width="100%"
        imgEl.style.height="100%"
        imgEl.onload = ()=>{ // 保证图片加载完成才导入
            
            ele.appendChild(imgEl)
        }
        imgEl.onerror = ()=>{ // 加载失败移除父元素
            let parent = ele.parentNode
            parent.parentNode.removeChild(parent)
        }
    }
    // useEffect(()=>{
    //      // 处理传递回来的image图片和css样式
    //      if(detail){// 为什么不在获取数据的时候执行函数，因为修改状态会更新，这个时候你还拿不到获取回来的html元素，或者你使用flushsync来更新渲染后拿到数据
    //         handleStyle(detail)
    //         handleImage(detail)
    //      }
         
    // },[detail])

    // 获取新闻详情
    useEffect(()=>{
        (async ()=>{
            // 获取新闻详情
            try{
                let res = await getNewsDetail(id);
               
                flushSync(()=>{//视图立马更新
                    setDetail(res)
                    handleStyle(res)
                }) // 组件立马渲染，这虽然handleImage拿不到更新后的值，但是可以拿到更新后的dom【含有更新后的状态值】
                handleImage(res)
               
            }catch(e){
                console.log("detail接口调用失败：",e)
            }
        })()
        return ()=>{ // 移除handleStyle插入的css的样式
            !link || document.head.removeChild(link)

        }
    },[])
   
    // 获取点赞
    useEffect(()=>{
        (async ()=>{
            try{
                let res = await getStoryExtra(id)
                setExtra(res)
            }catch(e){
                console.log("点赞接口调用失败：",e)
            }
        })()
    },[])


    //登陆和收藏 ---------

    let {
        base:{info},getInfo,
        store:{list:starList},getStoreListSync,cancelCollectId
    } = props
    // let [_,refresh] = useState(null)

    // 页面进来如果没有个人信息获取个人信息,获取收藏列表
    useEffect(()=>{
        (
            async()=>{
                if(!info){
                  let res =  await getInfo() // 获取派发后的用户信息
                  info = res.info
                }
                // 如果已经登陆，并且没有获取收藏列表信息(获取列表信息)
                if(info && !starList){
                    getStoreListSync()
                }
            }
        )()
            
        
    },[])

    // 判断当前id是否在收藏列表中
    const isStore = useMemo(()=>{
        if(!starList) return false;
        return starList.some((item)=>{
            return +item.news.id === +id
        })
    },[starList,id])

    const handleStore = async ()=>{
        if(!info){ // 未登陆
            Toast.show({
                content:"请先登陆",
                icon:"fail"
            })
            navigate({
                pathname:"/Login",
                search:`?to=${location.pathname}`
            },{
                replace:true
            })
        }else{
            // 已近登陆，进行收藏或者移除
            if(isStore!==true){
                try{
                   
                    let {code} = await collectNews(id)
                    if(+code !== 0){
                        Toast.show({
                            icon:"fail",
                            content:"收藏失败"
                        })
                    }else{
                        Toast.show({
                            icon:"sucess",
                            content:"收藏成功"
                        })
                    }
                }catch(E){}
                console.log("111",id)
                 // 同步最新的收藏列表到redux
                 setTimeout(()=>{ // 因为这里经常出现服务器代理504错误，设置这个避免网管超时
                    getStoreListSync()
                 },400)
                
            }else{

                // 
                let item = starList.find(item => {
                    if(+item.news.id === +id){
                        return id
                    }
                })
                if(!item)return;
                let {code} = await cancelCollect(item.id)
                if(+code !== 0){
                    Toast.show({
                        icon:"fail",
                        content:"操作失败"
                    })
                }else{
                    Toast.show({
                        icon:"sucess",
                        content:"操作成功"
                    })
                }
                cancelCollectId(id) // 告诉redux移除了
                // getStoreListSync()
               
            }

        }
    }

    return <div className="plain_detail">
        {/* 渲染html，并给其绑定css样式 */}
        {detail?<div className="content" dangerouslySetInnerHTML={{
            __html:detail.body}}></div>:<SkeletonAgain />}

         <div className="footer">
            <div className="left" onClick={toPath}>
                <LeftOutline fontSize = {24} />
            </div>
            <div className="iconbox">
                <Badge content={extra?extra.comments:0}>
                    <MessageOutline fontSize = {24} />
                </Badge>
            </div>
            <div className="iconbox">
                <Badge content={extra?extra.popularity:0}>
                    <LikeOutline fontSize = {24} />
                </Badge>
            </div>
                {/* <Badge content="10" color={info?'cyan':'black'}> */}
            <div className="iconbox">
                   <div  onClick={handleStore}><StarOutline color={isStore?'cyan':''} fontSize = {24} /></div> 
                {/* </Badge> */}
            </div>
            <div className="iconbox">
                {/* <Badge content='5'> */}
                    <MoreOutline fontSize = {24} />
                {/* </Badge> */}
            </div>
         </div>
    </div>
}
export default connect(state=>state,{...action.base,...action.store})(Detail);