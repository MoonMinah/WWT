const CommentReplyModel = (sequelize, DataTypes) => {
    const CommentReply = sequelize.define(
        "CommentReply",
        {
            replyID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            replyText: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            createDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
        }
    );

    return CommentReply;
};

module.exports = CommentReplyModel;
