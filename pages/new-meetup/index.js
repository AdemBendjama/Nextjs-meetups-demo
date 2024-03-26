import NewMeetupForm from '@/components/meetups/NewMeetupForm'
import { useRouter } from 'next/router'
import React from 'react'

function NewMeetupPage() {
    const router = useRouter()
    const addMeetupHandler = async (meetupData) => {
        try {
            const response = await fetch('/api/new-meetup', {
                method: 'POST',
                body: JSON.stringify(meetupData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const message = (await response.json()).message
            console.log(message);
            router.replace('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    )
}

export default NewMeetupPage
