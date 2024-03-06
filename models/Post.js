const PostModel = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        "Post",
        {
            postNumber: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            postTitle: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            weather: {
                type: DataTypes.ENUM,
                values: ["sunny", "rainy", "snow", "cloudy"],
                allowNull: true,
            },
            region: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            reImage: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            tableName: "Post",
            freezeTableName: true,
            timestamps: true,
        }
    );

    return Post;
};

module.exports = PostModel;
