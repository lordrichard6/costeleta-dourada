export interface MenuItem {
    name: string;
    description: string;
    price: string;
}

export interface MenuCategory {
    category: string;
    className?: string;
    items: MenuItem[];
}

export interface DailySpecial {
    day: string;
    dish: string;
    price: string;
    desc: string;
    image: string;
}

export const DAILY_SPECIALS: DailySpecial[] = [
    { day: 'Segunda', dish: 'Cozido de Grão', price: '12€', desc: 'Grão cozido com carne de porco, enchidos regionais, batata e abóbora.', image: '/images/Cozido de Grão.png' },
    { day: 'Terça', dish: 'Sopa de Cação', price: '14€', desc: 'Sopa aromática de cação com coentros, alho, pão alentejano e azeite.', image: '/images/Sopa de Cação.png' },
    { day: 'Quarta', dish: 'Migas com Entrecosto', price: '15€', desc: 'As tradicionais migas de pão com entrecosto frito em banha e alho.', image: '/images/Migas com Entrecosto.png' },
    { day: 'Quinta', dish: 'Ensopado de Borrego', price: '16€', desc: 'Estufado rico de borrego servido sobre fatias de pão caseiro.', image: '/images/Ensopado de Borrego.png' },
    { day: 'Sexta', dish: 'Bacalhau Dourado', price: '15€', desc: 'Bacalhau desfiado com batata palha, ovos e salsa.', image: '/images/Bacalhau Dourado.png' },
    { day: 'Sábado', dish: 'Carne de Porco à Alentejana', price: '18€', desc: 'O ex-libris da casa: carne marinada, amêijoas e batata frita.', image: '/images/Carne de Porco à Alentejana.png' },
];

export const MENU_CATEGORIES: Omit<MenuCategory, 'className'>[] = [
    {
        category: 'Pratos Tradicionais',
        items: [
            { name: 'Açorda Alentejana', description: 'Sopa de pão com alho, coentros, azeite e ovo escalfado.', price: '10€' },
            { name: 'Migas com Entrecosto', description: 'Pão alentejano tradicional com entrecosto frito.', price: '16€' },
            { name: 'Sopa de Tomate', description: 'Com enchidos, ovo e pão frito.', price: '12€' },
            { name: 'Sopa de Beldroegas', description: 'Com ovo escalfado e queijo de cabra fresco.', price: '11€' },
            { name: 'Cabeça de Xara', description: 'Entrada fria tradicional servida com picles caseiros.', price: '9€' }
        ]
    },
    {
        category: 'Pratos de Peixe',
        items: [
            { name: 'Bacalhau Dourado', description: 'Bacalhau desfiado com batata palha e ovos.', price: '15€' },
            { name: 'Polvo à Lagareiro', description: 'Polvo assado no forno com batata a murro e muito azeite.', price: '22€' },
            { name: 'Robalo Grelhado', description: 'Peixe fresco da costa grelhado no carvão.', price: '18€' },
            { name: 'Cação de Coentrada', description: 'O clássico inconfundível com vinagre e coentros.', price: '16€' },
            { name: 'Filetes de Polvo', description: 'Com arroz de feijão malandrinho.', price: '20€' }
        ]
    },
    {
        category: 'Pratos de Carne',
        items: [
            { name: 'Carne de Porco à Alentejana', description: 'Cubos de carne de porco fritos com amêijoas e batata.', price: '18€' },
            { name: 'Secretos de Porco Preto', description: 'Grelhados no carvão com sal e orégãos.', price: '19€' },
            { name: 'Ensopado de Borrego', description: 'Borrego tenro estufado com pão e hortelã.', price: '19€' },
            { name: 'Plumas de Porco Preto', description: 'Grelhadas simples com flor de sal.', price: '18€' },
            { name: 'Borrego Assado no Forno', description: 'Lentamente assado com batatinha nova.', price: '21€' }
        ]
    },
    {
        category: 'Para Crianças',
        items: [
            { name: 'Bitoque da Pequenada', description: 'Bife fininho com ovo, batata frita e arroz.', price: '9€' },
            { name: 'Panadinhos de Frango', description: 'Peito de frango panado com arroz de cenoura.', price: '9€' },
            { name: 'Robalinho Grelhado', description: 'Filete de robalo sem espinhas com puré.', price: '10€' }
        ]
    },
    {
        category: 'Sobremesas',
        items: [
            { name: 'Sericaia com Ameixa', description: 'O doce conventual mais famoso do Alentejo.', price: '6€' },
            { name: 'Pão de Rala', description: 'Doce de amêndoa e gila.', price: '5€' },
            { name: 'Encharcada', description: 'Doce de ovos tradicional.', price: '5€' },
            { name: 'Toucinho do Céu', description: 'Doce de amêndoa muito rico e húmido.', price: '6€' },
            { name: 'Mousse de Chocolate', description: 'Receita da avó, feita com chocolate 70%.', price: '5€' }
        ]
    },
    {
        category: 'Vegan',
        items: [
            { name: 'Aviso', description: 'Não temos pratos veganos. Aqui só servimos boa comida alentejana.', price: '' }
        ]
    },
    {
        category: 'Vinhos',
        items: [
            { name: 'Cartuxa Colheita', description: 'Évora - Tinto encorpado e elegante.', price: '25€' },
            { name: 'Esporão Reserva', description: 'Reguengos - Clássico alentejano, rico e complexo.', price: '28€' },
            { name: 'Borba Rótulo Cortiça', description: 'Borba - Frutado e macio.', price: '14€' },
            { name: 'Pêra Manca Branco', description: 'Évora - Um dos melhores brancos de Portugal.', price: '55€' },
            { name: 'Vinho da Casa (Jarro)', description: 'Produção local de Estremoz.', price: '8€' }
        ]
    }
];
