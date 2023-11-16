const BreadcrumbsTranslation: { [english: string]: string | undefined} = {
    'maps': 'карты',
    'login': 'аутентификация',
    'register': 'регистрация',
    'cart': 'корзина',
    'edit': 'изменить',
    'create': 'создать',
    'requests': 'заявки',
    'table': 'таблица'
};

export const TranslateBreadcrumb = (path: string) => {
    const translation = BreadcrumbsTranslation[path];
    if (translation !== undefined) {
        return translation;
    }
    return path;
}