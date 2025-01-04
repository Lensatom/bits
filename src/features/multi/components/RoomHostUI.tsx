import React from "react";
// import Button from "../../../components/Button";
import Player from "./Player";
import { Loader } from "../../../components";

type Props = {
  room: any,
  userData: any
  start: any
  ready: boolean
  players: any
}

const RoomHostUI = (props:Props) => {
  const { room, userData, start, ready, players } = props;

  if (players) {
    return (
      <div className='w-full h-screen flex flex-col justify-center px-3'>
        <h2 className='text-2xl font-semibold'>Room</h2>
        <p className="pb-5 border-b-2">You are now hosting</p>
        <p className="mt-5">Room title: {room.title}</p>
        <p>Passcode: {room.passcode}</p>
        <p>Host: {userData.username}</p>
        <p className="mt-5 border-t-2 pt-5">Connected players</p>
        <div className="grid grid-cols-3 gap-3 mt-3 h-[50%] overflow-y-scroll py-2">
          {players.map((player:any) => {
            return (
              <React.Fragment key={player.username}>
                <Player player={player} />
              </React.Fragment>
            )
          })}
        </div>
        {/* <Button type="click" func={() => start()} status={ready ? "active" : "inActive"} content={ready ? "Start" : "Waiting..."} /> */}
      </div>
    )
  } else {
    return (
      <div>
        <Loader message="Getting all players" />
      </div>
    )
  }
}

export default RoomHostUI