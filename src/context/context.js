import React, { useState, useEffect, useContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();
// provider, consumer - GithubContext.provider
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  // reuest and loading
  const [request, setRequest] = useState(0);
  const [isLoding, setIsLoading] = useState(false);
  //set error usestate
  const [error, setError] = useState({ show: false, msg: 'error' });

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) => {
      console.log(err);
    });
    //console.log(response);
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      //get the repos
      // https://api.github.com/users/john-smilga/repos?per_page=100
      axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) =>
        setRepos(response.data)
      );
      // get the followers
      //https://api.github.com/users/john-smilga/followers

      axios(`${followers_url}?per_page=100`).then((response) =>
        setFollowers(response.data)
      );
      // More logic comes here
      //    await Promise.allSettled([]);
    } else {
      toggleError(true, 'There is no user with that user name');
    }
    checkRequest();
    setIsLoading(false);
  };

  //check rate limit
  const checkRequest = () => {
    axios
      .get(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        //console.log(remaining);
        setRequest(remaining);
        if (remaining === 0) {
          toggleError(true, 'sorry you are existed hourly limit');
        }
      })
      .catch((err) => console.log(err));
  };
  //error function
  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }

  useEffect(checkRequest, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        request,
        error,
        isLoding,
        searchGithubUser,
      }}>
      {children}
    </GithubContext.Provider>
  );
};
//custom hook for global context
export const useGlobalContext = () => {
  return useContext(GithubContext);
};

export { GithubContext, GithubProvider };
