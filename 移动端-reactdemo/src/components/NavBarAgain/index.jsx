import {NavBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import {useLocation,useSearchParams,useNavigate} from "react-router-dom"
import "./index.less"
function NavBarAgain(props) {
  const [usp] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  let {title} = props;
  const handleBack = () => {
      // 登陆页 & detail/xxx，因为在做detail跳转到login的时候使用了replace（没有detail这条历史记录了），所以navigate-1跳转不到detail需要特殊处理
      // 为什么要这样做，因为detail携带to=“/detail”跳转login，login登陆成功跳到detail（login用了replace），detail的上一条历史记录就是detail，所以使用detail跳转login要用replace
      let to = usp.get("to")
      if(location.pathname === "/login" && /^\/detail\/\d$/.test(to) ){
        navigate(to,{replace:true})
        return 
      }
      navigate(-1)
  }
  return (
    <div className="nav-bar-again">
         <NavBar onBack={handleBack}>{title}</NavBar>
    </div>
  );
}

NavBarAgain.defaultProps = {
    title: '个人中心'
} 
NavBarAgain.propTypes = {
    title: PropTypes.string
}
export default NavBarAgain;