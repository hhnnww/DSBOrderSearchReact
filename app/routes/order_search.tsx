import { Alert, Button, Chip, Stack, TextField } from "@mui/material"
import { useState } from "react"
import type { MetaFunction } from "react-router"
import { getOrderOrderSnGet, type GetOrderOrderSnGetResponse } from "src/client"

export const meta: MetaFunction = () => [{ title: "订单查询系统" }]

export default function Component() {
    const [order, setOrder] = useState('')
    const [res, setRes] = useState<GetOrderOrderSnGetResponse | null>()
    const [msg, setMsg] = useState('')

    async function getOrderHandle() {
        const res = await getOrderOrderSnGet({ query: { order_sn: order } })
        console.log(res)
        if (res?.data) {
            if (res.data.find_state === 200) {
                setMsg('订单存在')
            } else {
                setMsg('订单不存在')
            }
            setRes(res.data)
        }
    }
    return <Stack spacing={4} alignItems={'start'} p={2} pt={12} sx={{ maxWidth: 600, margin: '0 auto' }}>
        <TextField autoComplete="off" fullWidth label='订单编号' value={order} onChange={(event) => { setOrder(event.target.value); setRes(null); setMsg('') }} />
        {msg &&
            <Alert color={msg === '订单存在' ? 'success' : "error"}>{msg}</Alert>}

        <Button variant="contained" disableElevation onClick={getOrderHandle}>查询订单</Button>
        {msg === '订单存在' && res && <Stack spacing={1}>
            <div className="">订单编号：{res.order_sn}</div>
            <div className="">微信昵称：{res.buyer_nick}</div>
            <div className="">订单金额：{res.bonus_amount}</div>
            <div className="">订单日期：{res.send_time_format}</div>
            <div className="">店铺：{res.shop_name}</div>
            <div className="">
                状态：
                {res.status_msg &&
                    <Chip color={res.status_msg === '已领取' ? "primary" : 'error'} label={res.status_msg} />}
            </div>
        </Stack>}
    </Stack >
}