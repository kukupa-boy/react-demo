import "./index.less";
import { Skeleton } from 'antd-mobile';
function SkeletonAgain(){
    return <div className='com-skeleton-again'> 
            <Skeleton.Title animated />
            <Skeleton.Paragraph lineCount={5} animated />
        </div>
}
export default SkeletonAgain;