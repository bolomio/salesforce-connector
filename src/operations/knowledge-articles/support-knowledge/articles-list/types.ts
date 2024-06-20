export type ArticleListResult = {
    articles: ListedKnowledgeArticle[]
    currentPageUrl: string
    nextPageUrl: string
    pageNumber: number
}

type ListedKnowledgeArticle = {
    articleNumber: string
    id: string
    summary: string
    title: string
    urlName: string
    viewCount: number
    viewScore: number
    categoryGroups: CategoryGroup[]
}

type CategoryGroup = {
    groupLabel: string
    groupName: string
    selectedCategories: SelectedCategory[]
}

type SelectedCategory = {
    categoryLabel: string
    categoryName: string
    url: string
}
