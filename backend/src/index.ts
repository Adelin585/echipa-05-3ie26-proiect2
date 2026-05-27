export default {
  register() {},

  async bootstrap({ strapi }) {
    // Verificăm dacă există deja categorii
    const existingCategories = await strapi.documents('api::category.category').findMany();
    
    if (existingCategories.length === 0) {
      console.log('Seeding baza de date cu date de test...');
      
      try {
        // Creare Categorii
        const cat1 = await strapi.documents('api::category.category').create({
          data: { Name: 'Web Development' },
          status: 'published',
        });
        const cat2 = await strapi.documents('api::category.category').create({
          data: { Name: 'UI/UX Design' },
          status: 'published',
        });
        const cat3 = await strapi.documents('api::category.category').create({
          data: { Name: 'Mobile Apps' },
          status: 'published',
        });

        // Functie helper pentru rich text (Blocks)
        const generateBlocks = (text) => [
          { type: 'paragraph', children: [{ type: 'text', text: text }] }
        ];

        // Creare Proiecte
        await strapi.documents('api::project.project').create({
          data: {
            Title: 'Platformă E-Commerce',
            Slug: 'ecommerce',
            Content: generateBlocks('Acesta este un proiect complet de e-commerce realizat cu React și Tailwind, folosind cele mai bune practici de design și performanță.'),
            category: cat1.documentId
          },
          status: 'published',
        });

        await strapi.documents('api::project.project').create({
          data: {
            Title: 'Redesign Dashboard',
            Slug: 'dashboard',
            Content: generateBlocks('Am regândit interfața unui dashboard analitic complex pentru a fi mult mai ușor de folosit și mai curat din punct de vedere vizual.'),
            category: cat2.documentId
          },
          status: 'published',
        });

        await strapi.documents('api::project.project').create({
          data: {
            Title: 'Aplicație Fitness IOS',
            Slug: 'fitness',
            Content: generateBlocks('Aplicație mobilă dezvoltată pentru trackuirea antrenamentelor, cu un design minimalist și modern.'),
            category: cat3.documentId
          },
          status: 'published',
        });

        await strapi.documents('api::project.project').create({
          data: {
            Title: 'Site Prezentare Arhitect',
            Slug: 'arhitect',
            Content: generateBlocks('Portofoliu digital pentru un arhitect renumit, punând accent pe imaginile mari și un layout imersiv.'),
            category: cat1.documentId
          },
          status: 'published',
        });

        // Creare About
        await strapi.documents('api::about.about').create({
          data: {
            Title: 'Noi suntem Echipa React!',
            Biography: generateBlocks('Suntem un grup de studenți entuziaști care adoră să programeze. Am construit acest proiect folosind Vite, Tailwind, React Router și Strapi CMS. A fost o provocare minunată din care am învățat enorm despre cum funcționează o aplicație full-stack în viața reală.')
          },
          status: 'published',
        });

        console.log('Seed complet!');
      } catch (err) {
        console.error('Eroare la seed:', err);
      }
    }
  },
};
