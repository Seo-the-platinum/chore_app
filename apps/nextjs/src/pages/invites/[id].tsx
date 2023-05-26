import React from 'react'
import { api } from '~/utils/api'
import Invite from '../../components/invite/Invite'

const Invites = () => {
    const { data: invites } = api.user.getUserInvites.useQuery()
    return (
        <div>
            {invites && invites.map(invite => {
                return <Invite key={invite.id} invite={invite} />
            })}
        </div>
    )
}

export default Invites