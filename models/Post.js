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
