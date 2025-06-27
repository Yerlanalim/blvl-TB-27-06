export const fetchGithubStars = async () => {
  const response = await fetch('https://api.github.com/repos/bizleveldev/BizLevel', {
    next: {
      revalidate: 3600,
    },
  });

  return response.json();
};
