const PostCommentModel = (sequelize, DataTypes) => {
    const PostComment = sequelize.define(
        "PostComment",
        {
            commentID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            commentText: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            weather: {
                type: DataTypes.ENUM,
                values: ["sunny", "rainy", "snow", "cloudy"],
                allowNull: false,
            },
            region: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {
            tableName: "PostComment",
            freezeTableName: true,
            timestamps: true,
        }
    );

    return PostComment;
};

module.exports = PostCommentModel;
