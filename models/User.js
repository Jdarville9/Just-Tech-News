const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our User model
class User extends Model {}

// define table columns and their types
User.init(
  {
    // define an id column
    id: {
      // type of data is a number
      type: DataTypes.INTEGER,
      // equivalent to NOT NULL
      allowNull: false,
      // instruct that this is the primary key
      primaryKey: true,
      // auto incrementing
      autoIncrement: true,
    },
    // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // cannot duplicate email values in this table
      unique: true,
      // if allowNull is false, we can run data through validor before creating table data
      validate: {
        isEmail: true,
      },
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // password must be at least 4 characters long
        len: [4],
      },
    },
  },
  {
    // TABLE CONFIGURATION OPTION GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createAt/updateAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "user",
  }
);

module.exports = User;
