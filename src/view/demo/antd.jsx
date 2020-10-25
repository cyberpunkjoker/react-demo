import {Component, React} from 'react'
import { Input, Select } from 'antd';

const { Option } = Select;



export default class Antd extends Component {
    state = {
        // 下拉展示数据，模拟传入最大值情况
        filterList: [
            {lable: 'dsdsd1', key: 'id1', tip: 'dsadadsa'},
            {lable: 'dsdsd2', key: 'id2', tip: 'dsadadsa'},
            {lable: 'dsdsd3', key: 'id3', tip: 'dsadadsa'},
            {lable: 'dsdsd4', key: 'id4', tip: 'dsadadsa'},
            {lable: 'dsdsd5', key: 'id5', tip: 'dsadadsa'},
            {lable: 'dsdsd6', key: 'id6', tip: 'dsadadsa'},
        ],
        // 动态生成的下拉选中
        displayList: [],
        // 记录每个 select 选中的元素
        hasSelected: {},
        selectList: [1],
        // 上传数据
        from: {}
    }

    componentDidMount() {
        let { filterList } = this.state
        this.setState({
            displayList: filterList
        })
    }

    addInput = () => {
        let {selectList, filterList} = this.state
        let isTure = selectList.length < filterList.length
        if (isTure) {
            selectList.push(1)
            this.setState({})
        }
    }

    // 最后需要上传的数据通过这里打印出来
    onBlur = (e, key) => {
        this.state.from[key] = e.target.value
        console.log(this.state.from);
    }

    // 最外层循环数据
    renderInput = () => {
        return (
            <div>
                {this.state.selectList.map((i, y)=>{
                    return (
                        <div style={{ marginBottom: 16 }}>
                            <Input 
                                addonBefore={this.renderDisplay(y)}
                                placeholder={i.tip}
                                value={this.state.from[i.key]}
                                onBlur={(e)=>this.onBlur(e,i.key)}
                                disabled={!this.state.hasSelected[y]}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }

    renderDisplay(y) {
        return (
            <Select placeholder='请选择' style={{ width: 100 }} onChange={(value)=>this.filterItem(value, y)}>
                {this.state.displayList.map((i,idx)=>{
                    return (
                        <Option
                            value={i.lable}
                            key={idx}
                        >{i.lable}</Option>
                    )
                })}
            </Select>
        )
    }

    filterItem = (value, y) => {
        let {hasSelected, filterList, selectList, displayList} = this.state
        hasSelected[y] = value
        filterList.forEach(i => {
            if (i.lable === value) {
                selectList[y] = { key: i.key, tips: i.tips}
            }
        })
        let arr = Object.values(hasSelected)
        displayList = filterList.filter(item => {
            let isTure = arr.some(inner=>inner === item.lable)
            return !isTure
        })
        this.setState({
            hasSelected,
            displayList,
            selectList
        })
    }

    render () {
        return (
            <div>
                {this.renderInput()}
                <p onClick={this.addInput}>点击添加</p>
            </div>
        )
    }
}