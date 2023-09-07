// 数据管理方案（相当于一个函数组件）
import {useState} from "react"
export default function demoModel(){
    const [count, setCount] = useState(0)

    const increment = () => { // 外部修改是异步修改的，可以加flushSync
        setCount(count + 1)
    }
    return {
        count,
        increment // 外部调用useModel().increment()，就是使用usestate修改，是异步的
    }
}