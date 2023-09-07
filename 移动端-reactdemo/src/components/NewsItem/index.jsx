import "./index.less"
import {Image} from "antd-mobile"
import { Link} from "react-router-dom"
import  PropTypes  from "prop-types"
function NewsItem (props) {
    // if(!props.info) return null // 边界处理（保证不报错）
    let {hint,title,id,images,image} = props.info 
    // if(!images || !image) return null // 边界处理
    return (
        <Link to={'/detail/'+id} className="news-item-box">
            <div className="news-item" >
                <div className="news-item-left">
                    <div className="news-item-left-title">{title}</div>
                    <div className="news-item-left-time">{hint}</div>
                </div>
                    <div className="news-item-right">
                        <Image lazy className="image" src={image ? image:images[0]} />
                    </div>
            </div>
        </Link>
    )
}
NewsItem.propTypes = {
    info: PropTypes.object
}
NewsItem.defaultProps = {
    info: null
}
export default NewsItem