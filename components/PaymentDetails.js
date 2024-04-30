 import React,{Component} from 'react';
 import axios from 'axios';

export default class PaymentDetails extends Component{
    constructor(props){
        super(props);

        this.state={
            payment:{}
        };
    }
    componentDidMount(){
        console.log(this.props);
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8070/post/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    payment:res.data.payment
                });

                console.log(this.state.payment);
            }
        })
    }
    render(){
        const {amount,date,bank,branch,remark} = this.state.payment;
        return(
            <div style={{marginTop:'20px'}}>
                <h4>Payment Details</h4>
                <hr/>
                <dl className="row">
                    <dt className="col-sm-3">Amount</dt>
                    <dd className="col-sm-9">{amount}</dd>

                    <dt className="col-sm-3">Date</dt>
                    <dd className="col-sm-9">{date}</dd>

                    <dt className="col-sm-3">Bank</dt>
                    <dd className="col-sm-9">{bank}</dd>

                    <dt className="col-sm-3">Branch</dt>
                    <dd className="col-sm-9">{branch}</dd>

                    <dt className="col-sm-3">Remark</dt>
                    <dd className="col-sm-9">{remark}</dd>

                </dl>
            </div>
        )

    }
}
