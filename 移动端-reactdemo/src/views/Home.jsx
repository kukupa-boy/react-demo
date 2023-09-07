import {useState,useEffect,useRef} from "react";
import {getNews,getBeforeNews} from "../api"
import {Swiper,Image,Divider, DotLoading} from "antd-mobile"
import _ from "../assets/utils"
import "./style/Home.less"
import HomeHead from "../components/HomeHead";
import NewsItem from "../components/NewsItem"
import SkeletonAgain from "../components/SkeletonAgain"
import { useNavigate } from "react-router-dom";
function Home(props){
    let navigate = useNavigate()
    let [today,setToday] = useState(_.formatTime(new Date(),'{0}{1}{2}'));
    let [swiperList,setSwiperList] = useState([]),
        [newsList,setNewsList] = useState([]);
    let loadMore = useRef(null);
    useEffect(()=>{ // 如果要返回的话，必须返回一个函数，不能是一个promise对象
        
        (async ()=>{
            try{
                // 获取轮播图
                let {date,stories,top_stories} = await getNews();
                
                setToday(date)
                setSwiperList(top_stories)
                newsList.push({
                    date,
                    stories
                })
                
                setNewsList([...newsList])  // 两次一样usestate不会更新，需要用扩展运算符
            } catch(err){
                return
            }
        })()
    }, [])
    // 第一次渲染完毕：实现触底加载
    useEffect(()=>{
        // loadMore.current.style='block'
        // 创建监听器(用来监听元素是否进入了设备的可视区域之内（比如滚动到底，看到loadmore了就会触发回调函数，离开也会触发回调)
        let ob = new IntersectionObserver( async changes=>{
           let {isIntersecting} = changes[0]; // 为false表示在视野外，为true表示在视野内(触底了)
           if(isIntersecting){
                // 获取当前的新闻就可以拿到昨天的新闻
                try{
                  let time = newsList[newsList.length - 1].date; 
                  let res = await getBeforeNews(time)
                  newsList.push(
                        {
                            date:res.date,
                            stories:res.stories
                        }
                  )
                  setNewsList([...newsList])
                } catch(err){
                    
                }
           }
        })
        ob.observe(loadMore.current)
        return ()=>{ // 组件卸载和释放的时候，取消监听
            ob.disconnect()
        }
    },[])
    // 跳转到对应详情页
    const toPath = (item) => { 
        navigate('/detail/'+item.id)
    }

    return <div className="home"> 
           <HomeHead today={today} />
           {/* 轮播图 */}
           <div className="swiper_box">
                <Swiper
                >
                    {/* 第一次渲染swiperList还不存在 */}
                {swiperList.length>0 ? swiperList.map((item, index) => (
                    <Swiper.Item key={item.id}>
                    <div
                        className="content_box"
                        // style={{backgroundImage: 'url('+ item.image +')' }}
                        onClick={toPath.bind(null,item)}
                    >   
                    {/* 图片懒加载 ：用户滑动的时候再加载*/}
                        <Image className="image" src={item.image} lazy ></Image>
                        <div>
                                <div className="content">{item.title}</div>
                                <div className="author">{item.hint}</div>
                        </div>

                    </div>
                    </Swiper.Item>
                    )):<Swiper.Item>
                        <div className="content_box">
                            <Image className="image" src="" lazy ></Image>
                        </div>
                    </Swiper.Item> }
                </Swiper>
           </div>
            {/* 新闻列表*/}
            {
               newsList.length>0 ?
               <>
               {
                    newsList.map((item,index)=>(
                            <div className="news_box" key={index}>
                                <Divider contentPosition="left" style={{display:index===0?'none':'block'}}>{_.formatTime(item.date,'{1}月{2}日')}</Divider>
                                <div className="list">
                                    {item.stories.map((item)=>(
                                        <NewsItem key={item.id} info={item} />
                                    ))}
                                </div>
                            </div>
                        ))
                }
                </>: <SkeletonAgain />
            }
            {/* 加载更多,display:none方便在第一次渲染完成拿到dom */}
            <div style={{ display:newsList.length>0?'block':'none'}} className="load_more" ref={loadMore} >
                正在加载中<DotLoading ></DotLoading>
            </div>
    </div>
    
}
export default Home;