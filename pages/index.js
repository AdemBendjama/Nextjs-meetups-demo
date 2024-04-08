import MeetupList from '@/components/meetups/MeetupList'
import React from 'react'
//! Server-Side Import
import { MongoClient, ServerApiVersion } from "mongodb";

function HomePage(props) {
    return (
        <>
            <MeetupList meetups={props.meetups} />
        </>
    )
}

//! Server-Side Code
export async function getStaticProps() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    let data = []

    try {
        await client.connect()
        const cursor = client.db('meetups').collection('meetups').find()
        data = await cursor.toArray()

    } catch (error) {
        console.log(error);
    }

    return (
        {
            props: {
                meetups: data.map(meetup => ({
                    id: meetup._id.toString(),
                    title: meetup.title,
                    image: meetup.image,
                    address: meetup.address,
                    description: meetup.description
                }))
            },
            revalidate: 1
        }
    )
}

export default HomePage
