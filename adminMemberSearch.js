const { Client } = require("@elastic/elasticsearch");

// 엘라스틱서치 클라이언트 설정
const client = new Client({ node: "http://49.50.167.42:8000" });

class AdminMemberSearch {
    async execute(query) {
        try {
            // 엘라스틱서치에서 검색 쿼리 실행
            const { body } = await client.search({
                index: "members", // 엘라스틱서치에서 사용하는 인덱스명
                body: {
                    query: {
                        multi_match: {
                            query: query,
                            fields: ["name", "username", "nickname", "email"], // 검색할 필드 목록
                        },
                    },
                },
            });

            // 엘라스틱서치 검색 결과 처리
            const hits = body.hits.hits.map((hit) => hit._source);

            return hits;
        } catch (error) {
            console.error("엘라스틱서치 검색 오류:", error);
            throw error;
        }
    }
}

module.exports = AdminMemberSearch;
