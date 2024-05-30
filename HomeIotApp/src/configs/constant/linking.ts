export const APP_SCHEME = 'yoohomeiot://';

const config = {
  screens: {
    Login: 'login',
    Register: 'register',
    Home: 'home',
    Scenes: 'scenes',
    Individual: {
      path: 'individual',
      screens: {
        MainIndividual: 'main',
        HomeManagement: {
          path: 'home-management',
          screens: {
            MainHomeManagement: {
              path: 'main/:userId',
              parse: {
                userId: (userId: string) => Number(userId),
              },
            },
          },
        },
      },
    },
    Settings: 'settings',
  },
};

export const linking = {
  prefixes: [APP_SCHEME],
  config,
};
