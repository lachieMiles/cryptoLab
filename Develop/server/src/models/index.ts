import sequelize from '../config/connection'; // Import the Sequelize instance
import { UserFactory } from './user'; // Import the User model factory

// Initialize the User model
const User = UserFactory(sequelize);

// Export the models and sequelize instance
export { User };
export default sequelize;
