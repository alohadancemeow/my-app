import React from 'react';
import axios from 'axios';

import { BASE_URL } from '../utils';
import { Video } from '../types';

import VideoCard from '../compoents/VideoCard';
import NoResults from '../compoents/NoResults';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length
        ? videos?.map((video: Video) => (
          <VideoCard post={video} isShowingOnHome key={video._id} />
        ))
        : <NoResults text={`No Videos`} />}
    </div>
  );
};

export default Home;

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  // let response = await axios.get(`${BASE_URL}/api/post`);
  let response = await axios.get(`http://localhost/api/post`);

  if (topic) {
    // response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
    response = await axios.get(`http://localhost/api/discover/${topic}`);
  }

  return {
    props: { videos: response.data },
  };
};