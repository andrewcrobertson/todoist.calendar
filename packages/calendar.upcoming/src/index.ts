import 'dotenv/config';

import { upcomingService } from './composition';

const run = async () => {
  try {
    const result = await upcomingService.post();
    console.log(result.ok);
  } catch (error) {
    console.error(error);
  }
};

run();
