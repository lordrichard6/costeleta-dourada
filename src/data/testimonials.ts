export interface Testimonial {
    name: string;
    quote: string;
    stars: number;
}

export const TESTIMONIALS: Testimonial[] = [
    {
        name: 'João Silva',
        quote: 'Uma experiência incrível! A carne de porco à alentejana estava divinal, tal como a minha avó fazia.',
        stars: 5
    },
    {
        name: 'Maria Santos',
        quote: 'Ambiente acolhedor e comida de chorar por mais. O melhor restaurante de Évora para quem procura tradição.',
        stars: 5
    },
    {
        name: 'António Costa',
        quote: 'Serviço impecável e pratos generosos. O ensopado de borrego é obrigatório!',
        stars: 5
    },
    {
        name: 'Sofia Martins',
        quote: 'A melhor Sericaia que já comi! Voltarei certamente com toda a família.',
        stars: 5
    },
    {
        name: 'Pedro Ferreira',
        quote: 'Vinhos excelentes e atendimento muito simpático. Recomendo vivamente.',
        stars: 5
    },
    {
        name: 'Ana Rodrigues',
        quote: 'O espaço é lindo e a comida superou as expectativas. Adorámos os pãezinhos de entrada.',
        stars: 5
    }
];
