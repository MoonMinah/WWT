const User = function (Sequelize, DataTypes) {
    return Sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            userID: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            userPW: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            userNickname: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            userEmail: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            userPhoto: {
                type: DataTypes.STRING, // 프로필 사진을 저장
                allowNull: true, // 프로필 사진은 선택적으로 저장
            },
            userText: {
                type: DataTypes.STRING(200), // user 소개글
                allowNull: true,
            },
            memLV: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
        },
        {
            tableName: "User",
            freezeTableName: true,
            timestamps: true,
        }
    );
};

module.exports = User;
