import React from 'react'
import { SecurityOutlined, LockClockOutlined, HttpOutlined, PaymentOutlined, NotificationsNoneSharp, SettingsBackupRestoreOutlined, ReceiptOutlined, ExtensionOutlined, EditOutlined, AddHomeWorkOutlined, } from '@mui/icons-material'

const sideBarItems = [
    {
      icon: <AddHomeWorkOutlined />,
      text: "Account overview"
    },
    {
      icon: <EditOutlined />,
      text: 'Edit profile'
    },
    {
      icon: <AddHomeWorkOutlined />,
      text: 'Address'
    },
    {
      icon: <LockClockOutlined />,
      text: 'Change password'
    },
    {
      icon: <NotificationsNoneSharp />,
      text: 'Notification settings'
    },
    {
      icon: <SecurityOutlined />,
      text: 'Privacy settings'
    },
    {
      icon: <PaymentOutlined />,
      text: 'Saved payment cards'
    },
    {
      icon: <SettingsBackupRestoreOutlined />,
      text: 'Recover playlists '
    },
    {
      icon: <ReceiptOutlined />,
      text: 'Receipts'
    },
    {
      icon: <ExtensionOutlined />,
      text: 'Apps'
    }
  ]

const Sidebar = () => {
  return (
    <div className='bg-zinc-900 w-[24vw] h-[590px]  flex flex-col '>
    <div className='flex flex-col '>
      <div className='h-20 w-[20vw] grid place-content-center mb-5 pl-2 mt-2'>
        <img src='./profile.png' className='w-[80px] h-[80px]  ' alt='profile pic' />
      </div>
      <div className='flex flex-col'>
        {sideBarItems.map((item, index) => {
          return <div key={index} className='flex text-sm space-x-5 font-semibold   border-b-[0.3px] border-zinc-800 text-white ml-1 mr-1 mb-2 pl-8 pr-5 pt-1 pb-2'>
            {item.icon}
            <h1>{item.text}</h1>
          </div>
        })}
      </div>
    </div>
  </div>

  )
}

export default Sidebar
