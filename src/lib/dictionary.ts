// src/lib/dictionary.ts

export type Language = 'en' | 'fr';

export const dictionary = {
  en: {
    nav: {
      shipping: "Worldwide Shipping Available",
      shop: "Shop",
      technology: "Technology",
      about: "About",
      contact: "Contact",
      account: "My Account",
      login: "Login / Register",
      logout: "Logout",
    },
    cart: {
      title: "CART",
      add: "Add",
      forFreeShipping: "for Free Shipping",
      unlocked: "You unlocked",
      freeShipping: "Free Shipping",
      empty: "Your bag is empty.",
      startShopping: "Start Shopping",
      equipment: "Equipment",
      supplies: "Supplies",
      recommended: "Recommended for you",
      subtotal: "Subtotal",
      viewBag: "View Bag",
      checkout: "Checkout",
      added: "ADDED",
      addToCart: "ADD TO CART",
      secure: "Secure Checkout",
      continue: "Continue Shopping",
      unitPrice: "Unit Price",
      remove: "Remove",
      summary: "Summary",
      shippingCalc: "Calculated at checkout",
      total: "Total",
    },
    hero: {
      available: "Gen-1 Series Available",
      titleLine1: "Molecular",
      titleLine2: "Purity.",
      description: "Experience the next standard in automated CDL generation. Engineered for laboratory precision, safety, and 99.9% purity.", // "clinical" -> "laboratory"
      btnPrimary: "Shop Gen-1 System",
      btnSecondary: "How it Works",
      renderText: "PRODUCT RENDER",
      unitName: "Dioxera Gen-1 Unit",
      concentration: "Concentration",
    },
    trust: {
      engineering: "Swiss Design", // Restored Swiss
      design: "Professional Grade", 
      lab: "Lab Certified",
      purity: "99.9% Purity Guaranteed",
      residue: "Zero Residue",
      distillation: "Advanced Distillation",
      medical: "Industrial Grade", // "Medical Grade" -> "Industrial Grade"
      iso: "ISO Compliant Materials",
    },
    features: {
      heading: "Technology Refined.",
      subheading: "We stripped away the complexity of manual generation to create a device that is safer, faster, and more potent.",
      f1_title: "Electrolytic Activation",
      f1_desc: "Our proprietary electrolysis chamber activates Sodium Chlorite with zero acid residue, ensuring the purest CDL solution available.",
      f2_title: "Smart Monitoring",
      f2_desc: "Integrated sensors continuously monitor PPM levels and temperature, adjusting the reaction in real-time for perfect consistency.",
      f3_title: "Hermetic Seal",
      f3_desc: "The closed-loop system prevents gas leakage, maximizing potency while ensuring complete safety for the operator.",
      f4_title: "Auto-Cycle Technology",
      f4_desc: "One-touch operation. The system handles the mixing, activation, and stabilization phases automatically.",
    },
    spotlight: {
      newRelease: "New Release",
      description: "The ultimate automated CDL production system. Generates exactly 3000 PPM solution with absolute precision.",
      buyNow: "Buy Now",
      seeTech: "See Technology",
      features: [
        "3000 PPM Precision",
        "Fully Automated Cycle",
        "Zero-Leak Technology",
        "Premium Grade Materials" // "Medical Grade" -> "Premium Grade"
      ]
    },
    accessories: {
      heading: "Essential Supplies",
      subheading: "Required for the operation of your Dioxera 3000.",
      viewCatalog: "View full catalog",
      essentialBadge: "Essential",
      viewAllMobile: "View Full Catalog"
    },
    faq: {
      heading: "Frequently Asked Questions",
      q1: "How long does the generator take to produce a batch?",
      a1: "The Gen-1 system produces 500ml of 3000 PPM solution in approximately 45 minutes.",
      q2: "Is it safe to use at home?",
      a2: "Yes. Unlike manual mixing which releases gas, our hermetically sealed chamber prevents any gas leakage, making it safe for indoor use.",
      q3: "What maintenance is required?",
      a3: "We recommend flushing the system with distilled water after every 5 uses. The reaction chamber should be replaced annually.",
      q4: "Do you ship internationally?",
      a4: "Yes, we ship from our warehouse to anywhere in Europe and North America via DHL Express.",
    },
    newsletter: {
      badge: "Stay Updated",
      titleStart: "Join the",
      titleEnd: "Inner Circle",
      description: "Get exclusive access to Gen-2 prototypes, technical protocol updates, and early-bird pricing on new equipment.", // "medical" -> "technical"
      placeholder: "Enter your email address",
      join: "Join",
      joined: "Joined",
      spam: "No Spam. Unsubscribe Anytime."
    },
footer: {
      tagline: "Leading the world in high-purity CDL generation technology. Swiss engineering, global impact.",
      col1: "Products",
      col2: "Support",
      col3: "Newsletter",
      col3_desc: "Join the elite circle of Dioxera owners.",
      contact: "Contact Us",
      shipping: "Global Shipping",
      warranty: "Warranty Claims",
      help: "Help Center",
      joinBtn: "JOIN",
      rights: "DIOXERA TECHNOLOGY. ALL RIGHTS RESERVED.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    shop: {
      title: "Catalog.",
      description: "Professional grade CDL generation equipment and certified consumables.",
      filter: "Filter All",
      inStock: "In Stock",
      loading: "Loading catalog...",
    },
    product: {
      breadcrumbShop: "Shop",
      noImage: "No Image Available",
      related: "Related Products",
      vat: "Inc. VAT",
      inStock: "In Stock",
      
      // New keys for the "Deep Dive" design
      series: "Professional Series",
      warranty: "2 Year Warranty",
      
      // Tabs
      tabSpecs: "Specifications",
      tabFeatures: "Sys. Features",
      tabBox: "In The Box",
      
      // Fallback/Empty States
      noSpecs: "No specifications available for this unit.",
      noFeatures: "No specific features listed.",
      noContent: "Contents not listed.",
      defaultDesc: "Engineered for autonomous operation and industrial precision.",
      
      // Mobile Headers
      techHighlights: "Technical Highlights"
    },
    technology: {
      hero: {
        badge: "Patented Electrolysis",
        titleLine1: "Purity through",
        titleLine2: "Physics.",
        description: "We replaced dangerous acid mixing with precision voltage. The result is a 99.9% pure Chlorine Dioxide solution, free from contaminants and byproducts."
      },
      comparison: {
        oldTitle: "The Old Method",
        oldDesc: "Traditional \"Manual Mixing\" involves combining Sodium Chlorite with Hydrochloric Acid. This uncontrolled reaction leaves residual acid in your final solution and releases dangerous fumes into the air.",
        oldPoints: [
          "High Acid Residue",
          "Toxic Fumes Leakage",
          "Inconsistent PPM"
        ],
        newBadge: "Gen-1 Technology",
        newTitle: "The Dioxera Method",
        newDesc: "Our generator uses Nano-Electrolysis to activate the precursor solution. The pure gas is generated in a hermetically sealed chamber and infused into distilled water.",
        newPoints: [
          "Zero Acid Residue",
          "Hermetically Sealed Safety",
          "Exact 3000 PPM Every Time"
        ]
      },
      steps: {
        heading: "The Activation Cycle",
        step1Title: "Electrolytic Separation",
        step1Desc: "A precise low-voltage current is applied to the Sodium Chlorite solution. This separates the Chlorine Dioxide molecule without requiring a harsh acid activator.",
        step2Title: "Gas Transfer",
        step2Desc: "The pure ClO2 gas is released into the system. Unlike liquids, the gas is inherently pure. It travels through a high-purity silicone bridge, leaving all heavy salts and impurities behind in the reaction chamber.", // "medical-grade" -> "high-purity"
        step3Title: "Molecular Infusion",
        step3Desc: "The gas is captured in chilled, distilled water until it reaches saturation at exactly 3000 PPM. The system sensors detect saturation and auto-stop the process to prevent over-concentration."
      },
      specs: {
        chamber: "Reaction Chamber",
        chamberVal: "Borosilicate Glass 3.3",
        electrodes: "Electrodes",
        electrodesVal: "Grade 2 Titanium", // "Medical Grade" -> "Grade 2"
        seals: "Seals",
        sealsVal: "Viton™ Chemical Resistant",
        calibration: "Calibration",
        calibrationVal: "Digital Photo-Sensor"
      },
      cta: {
        title: "Ready to upgrade?",
        btn: "Shop the Gen-1 System"
      }
    },
    about: {
      hero: {
        est: "Est. 2024",
        titleLine1: "We are building the",
        titleLine2: "future of sanitation.",
        description: "Dioxera was founded on a simple premise: Industrial-grade purity should be accessible to everyone. We engineer automated systems that remove the danger and guesswork from Chlorine Dioxide generation."
      },
      story: {
        location: "Brussels, Belgium",
        hq: "Headquarters",
        quote: "\"We saw a market filled with dangerous, manual mixing kits and unstable solutions. We knew there had to be a better way—a way to use precision engineering to guarantee safety.\"",
        founderRole: "Founder & CEO",
        heading: "From Lab to Living Room.",
        p1: "For decades, generating high-purity Chlorine Dioxide (CDL) was a process reserved for industrial chemists. It involved hazardous acids, toxic fumes, and precise temperature controls that were impossible to replicate at home.",
        p2Part1: "Dioxera changed that. By miniaturizing the electrolytic activation process used in municipal water treatment, we created the ",
        p2Part2: "Gen-1 Series",
        p2Part3: ".",
        p3: "Today, we are proud to serve over 5,000 customers across Europe and North America, providing them with the tools to generate lab-grade purity on demand.", // "medical-grade" -> "lab-grade"
        stats: {
          purity: "Purity Grade",
          patents: "Patents Filed",
          support: "Global Support",
          warranty: "Warranty"
        }
      },
      values: {
        heading: "Our Core Principles",
        subheading: "We don't cut corners. Every device we build is a testament to these three non-negotiable values.",
        v1Title: "Precision First",
        v1Desc: "In chemistry, \"close enough\" is dangerous. Our sensors are calibrated to 0.01% tolerance to ensure your solution is exactly 3000 PPM.",
        v2Title: "Safety by Design",
        v2Desc: "We engineer out the risk. Hermetic seals, child-locks, and auto-shutoff features protect you and your family from accidents.",
        v3Title: "Sustainability",
        v3Desc: "We build for longevity, not obsolescence. Our borosilicate glass and stainless steel components are designed to last a lifetime."
      },
      cta: {
        title: "Join the movement.",
        desc: "Experience the difference of Swiss design. Stop settling for impure solutions.", // "Swiss engineering" -> "Swiss design"
        btn1: "View Our Products",
        btn2: "Contact Support"
      }
    },
    contact: {
      hero: {
        titleStart: "Get in",
        titleEnd: "Touch.",
        desc: "Our global support team is available to assist with technical specs, shipping, and maintenance inquiries."
      },
      info: {
        emailLabel: "Email",
        hqLabel: "Company",
        hqValue: "Rue de la Presse 4-1000 Bruxelles\nEVER CARE EUROPE SRL" // Updated Address
      },
      success: {
        title: "Message Received",
        desc: "Thank you for contacting Dioxera. Our support team will respond to your inquiry within 24 hours.",
        btn: "Send another message"
      },
form: {
        nameLabel: "Full Name",
        namePlaceholder: "John Doe",
        emailLabel: "Email Address",
        emailPlaceholder: "john@example.com",
        phoneLabel: "Phone Number", // NEW
        phonePlaceholder: "+1 (555) 000-0000", // NEW
        subjectLabel: "Subject",
        subjectPlaceholder: "Select a topic...", // Changed to select prompt
        subjectOptions: { // NEW OPTIONS
          general: "General Inquiry",
          support: "Technical Support",
          sales: "Sales & Orders",
          partnership: "Partnership",
          other: "Other"
        },
        messageLabel: "Message",
        messagePlaceholder: "Your message...",
        btnSending: "SENDING...",
        btnSend: "SEND MESSAGE",
        errorGeneric: "Something went wrong. Please try again."
      }
    },
    login: {
      createAccount: "Create Account",
      accessPortal: "Access Portal",
      resetTitle: "Reset Password",
      environment: "Dioxera Secure Environment",
      emailLabel: "Email",
      passwordLabel: "Password",
      signUpBtn: "Sign Up",
      loginBtn: "Login",
      resetBtn: "Send Instructions",
      forgotPassword: "Forgot Password?",
      toggleToLogin: "Already have an account? Login",
      toggleToSignUp: "New Customer? Create Account",
      backToLogin: "Back to Login",
      returnHome: "Return Home",
      alertSignup: "Check your email to confirm signup!",
      alertReset: "Check your email for the password reset link!",
      loading: "Loading..."
    },
    resetPassword: {
      title: "Set New Password",
      desc: "Please enter your new password below.",
      passwordLabel: "New Password",
      confirmLabel: "Confirm Password",
      btn: "Update Password",
      success: "Password updated successfully!",
      errorMatch: "Passwords do not match.",
      redirecting: "Redirecting to login...",
      placeholder: "••••••••"
    },
    checkout: {
      gate: {
        title: "How would you like to checkout?",
        hasAccount: "Have an account?",
        loginDesc: "Login to access saved addresses and order history.",
        loginBtn: "Login",
        createBtn: "Create Account",
        guestTitle: "Guest Checkout",
        guestDesc: "No account required. You can create one later if you want.",
        guestBtn: "Continue as Guest"
      },
      auth: {
        welcome: "Welcome Back",
        create: "Create Account",
        back: "Back",
        email: "Email",
        password: "Password",
        signingIn: "Signing in...",
        loginAndCheckout: "Login & Checkout",
        creating: "Creating...",
        registerAndCheckout: "Register & Checkout"
      },
      main: {
        secureCheckout: "SECURE CHECKOUT",
        empty: "Your cart is empty.",
        return: "Return to Shop"
      },
      summary: {
        title: "Order Summary",
        empty: "Cart is empty",
        subtotal: "Subtotal",
        shipping: "Shipping",
        free: "FREE",
        tax: "Sales Tax (Included)",
        total: "Total to pay",
        logistics: "Global Logistics"
      },
      form: {
        contact: "Contact Details",
        email: "Email Address",
        phone: "Phone Number",
        shipping: "Shipping Address",
        firstName: "First Name",
        lastName: "Last Name",
        street: "Street Address",
        city: "City",
        zip: "ZIP / Postal Code",
        country: "Country / Region",
        selectCountry: "Select Country...",
        billingSame: "Billing address is same as shipping",
        billingDiff: "Uncheck to enter a different billing address",
        billingTitle: "Billing Details",
        paymentTitle: "Payment Method",
        cc: "Credit Card",
        paypal: "PayPal",
        bank: "Bank Transfer",
        bankInstructions: "Bank Transfer Instructions",
        bankDesc: "You will receive our IBAN and invoice via email immediately. Your order ships once funds clear.",
        pay: "PAY",
        placeOrder: "PLACE ORDER",
        processing: "PROCESSING..."
      }
    },
    success: {
      titleBank: "Order Placed!",
      titleCard: "Payment Successful!",
      orderRecorded: "Order #{id} has been recorded.",
      cardMessage: "Thank you for your purchase. A confirmation email has been sent to you.",
      downloadBtn: "Download Official Invoice",
      bankTitle: "Bank Transfer Details",
      pending: "Payment Pending",
      reported: "Payment Reported",
      confirmedBadge: "Confirmed",
      bankInstructions: "Please copy the details below or use the Wise link.",
      crucial: "Crucial",
      useRef: "Use #{ref} as reference.",
      copy: {
        iban: "IBAN",
        bic: "BIC / SWIFT",
        ref: "Reference"
      },
      payWise: "Pay with Wise",
      iHavePaid: "I Have Paid",
      thankYou: "Thank you!",
      notifyMessage: "We have notified our team to look for your transfer. Your order will ship as soon as funds clear.",
      downloadPdf: "Download Invoice PDF",
      returnHome: "Return Home",
      continueShopping: "Continue Shopping"
    },
    dashboard: {
      title: "My Account",
      signOut: "Sign Out",
      orders: {
        title: "Order History",
        empty: "No orders found.",
        startShopping: "Start Shopping",
        invoice: "Invoice",
        total: "Total",
        paidCard: "Paid via Card",
        paidPaypal: "Paid via PayPal",
        bankTransfer: "Bank Transfer"
      },
      support: {
        title: "Support",
        newTicket: "+ New Ticket",
        cancel: "Cancel",
        subjectPh: "Subject",
        messagePh: "How can we help?",
        submit: "Submit Request",
        chatPh: "Type a message...",
        status: {
          open: "Open",
          resolved: "Resolved",
          closed: "Closed"
        }
      }
    },
    admin: {
      header: {
        title: "ADMIN PANEL",
        logout: "Logout"
      },
      tabs: {
        orders: "Orders",
        tickets: "Tickets",
        users: "Users",
        qr: "Dynamic QR"
      },
      orders: {
        id: "ID",
        customer: "Customer",
        total: "Total",
        status: "Status",
        action: "Action",
        view: "View",
        statusOptions: {
          pending: "Pending",
          paid: "Paid",
          shipped: "Shipped",
          cancelled: "Cancelled"
        }
      },
      tickets: {
        from: "From"
      },
      qr: {
        titleEdit: "Edit Link Destination",
        titleNew: "Create New QR",
        label: "Label (Internal)",
        dest: "Destination URL (Any Link)",
        btnUpdate: "Update Link",
        btnCreate: "Create",
        btnCancel: "Cancel",
        note: "* You can update the Destination URL anytime. The QR code image will remain valid.",
        tableLabel: "Label",
        tableSmart: "Smart Link (Print This)",
        tableDest: "Redirects To (Editable)",
        tableScans: "Scans",
        tableActions: "Actions",
        empty: "No QR Codes created yet. Create one above!"
      },
      modalOrder: {
        title: "Order #",
        currentStatus: "Current Status",
        items: "Items",
        customer: "Customer",
        shipping: "Shipping",
        downloadInvoice: "Download Official Invoice PDF",
        paidVia: "Paid via"
      },
      chat: {
        customer: "Customer",
        placeholder: "Type a reply...",
        open: "Open",
        resolved: "Resolved"
      }
    }
  },
  fr: {
    nav: {
      shipping: "Livraison internationale disponible",
      shop: "Boutique",
      technology: "Technologie",
      about: "À Propos",
      contact: "Contact",
      account: "Mon Compte",
      login: "Connexion / Inscription",
      logout: "Déconnexion",
    },
    cart: {
      title: "PANIER",
      add: "Ajoutez",
      forFreeShipping: "pour la Livraison Gratuite",
      unlocked: "Vous avez débloqué",
      freeShipping: "Livraison Gratuite",
      empty: "Votre panier est vide.",
      startShopping: "Commencer vos achats",
      equipment: "Équipement",
      supplies: "Fournitures",
      recommended: "Recommandé pour vous",
      subtotal: "Sous-total",
      viewBag: "Voir le panier",
      checkout: "Paiement",
      added: "AJOUTÉ",
      addToCart: "AJOUTER AU PANIER",
      secure: "Paiement Sécurisé",
      continue: "Continuer vos achats",
      unitPrice: "Prix Unitaire",
      remove: "Retirer",
      summary: "Résumé",
      shippingCalc: "Calculé au paiement",
      total: "Total",
    },
    hero: {
      available: "Série Gen-1 Disponible",
      titleLine1: "Pureté",
      titleLine2: "Moléculaire.",
      description: "Découvrez la nouvelle norme en matière de génération automatisée de CDL. Conçue pour une précision de laboratoire, une sécurité et une pureté de 99,9 %.", // "clinique" -> "laboratoire"
      btnPrimary: "Acheter le Système Gen-1",
      btnSecondary: "Comment ça marche",
      renderText: "RENDU PRODUIT",
      unitName: "Unité Dioxera Gen-1",
      concentration: "Concentration",
    },
    trust: {
      engineering: "Design Suisse", // Restored Swiss
      design: "Qualité Professionnelle", 
      lab: "Certifié en Laboratoire",
      purity: "Pureté 99,9% Garantie",
      residue: "Zéro Résidu",
      distillation: "Distillation Avancée",
      medical: "Qualité Industrielle", // "Médicale" -> "Industrielle"
      iso: "Matériaux Conformes ISO",
    },
    features: {
      heading: "Technologie Raffinée.",
      subheading: "Nous avons éliminé la complexité de la production manuelle pour créer un appareil plus sûr, plus rapide et plus puissant.",
      f1_title: "Activation Électrolytique",
      f1_desc: "Notre chambre d'électrolyse exclusive active le chlorite de sodium sans aucun résidu acide, garantissant la solution CDL la plus pure disponible.",
      f2_title: "Surveillance Intelligente",
      f2_desc: "Des capteurs intégrés surveillent en permanence les niveaux de PPM et la température, ajustant la réaction en temps réel pour une cohérence parfaite.",
      f3_title: "Sceau Hermétique",
      f3_desc: "Le système en boucle fermée empêche toute fuite de gaz, maximisant la puissance tout en assurant une sécurité totale pour l'opérateur.",
      f4_title: "Technologie Auto-Cycle",
      f4_desc: "Fonctionnement à une touche. Le système gère automatiquement les phases de mélange, d'activation et de stabilisation.",
    },
    spotlight: {
      newRelease: "Nouvelle Sortie",
      description: "Le système de production CDL automatisé ultime. Génère une solution à exactement 3000 PPM avec une précision absolue.",
      buyNow: "Acheter Maintenant",
      seeTech: "Voir la Technologie",
      features: [
        "Précision 3000 PPM",
        "Cycle Entièrement Automatisé",
        "Technologie Zéro Fuite",
        "Matériaux de Haute Qualité" // "Qualité Médicale" -> "Haute Qualité"
      ]
    },
    accessories: {
      heading: "Fournitures Essentielles",
      subheading: "Nécessaire pour le fonctionnement de votre Dioxera 3000.",
      viewCatalog: "Voir tout le catalogue",
      essentialBadge: "Essentiel",
      viewAllMobile: "Voir Tout le Catalogue"
    },
    faq: {
      heading: "Questions Fréquentes",
      q1: "Combien de temps le générateur met-il pour produire un lot ?",
      a1: "Le système Gen-1 produit 500ml de solution à 3000 PPM en environ 45 minutes.",
      q2: "Est-ce sûr à utiliser à la maison ?",
      a2: "Oui. Contrairement au mélange manuel qui libère des gaz, notre chambre hermétiquement scellée empêche toute fuite, le rendant sûr pour une utilisation en intérieur.",
      q3: "Quel entretien est nécessaire ?",
      a3: "Nous recommandons de rincer le système avec de l'eau distillée toutes les 5 utilisations. La chambre de réaction doit être remplacée annuellement.",
      q4: "Expédiez-vous à l'international ?",
      a4: "Oui, nous expédions depuis notre entrepôt vers toute l'Europe et l'Amérique du Nord via DHL Express.",
    },
    newsletter: {
      badge: "Restez Informé",
      titleStart: "Rejoignez le",
      titleEnd: "Cercle Intérieur",
      description: "Obtenez un accès exclusif aux prototypes Gen-2, aux mises à jour des protocoles techniques et aux prix préférentiels sur les nouveaux équipements.", // "médicaux" -> "techniques"
      placeholder: "Entrez votre adresse email",
      join: "Rejoindre",
      joined: "Inscrit",
      spam: "Pas de Spam. Désinscription à tout moment."
    },
footer: {
      tagline: "Leader mondial de la technologie de génération de CDL haute pureté. Ingénierie suisse, impact mondial.",
      col1: "Produits",
      col2: "Support",
      col3: "Newsletter",
      col3_desc: "Rejoignez le cercle d'élite des propriétaires Dioxera.",
      contact: "Nous Contacter",
      shipping: "Livraison Mondiale",
      warranty: "Garantie",
      help: "Centre d'Aide",
      joinBtn: "REJOINDRE",
      rights: "DIOXERA TECHNOLOGY. TOUS DROITS RÉSERVÉS.",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation"
    },
    shop: {
      title: "Catalogue.",
      description: "Équipement de génération de CDL de qualité professionnelle et consommables certifiés.",
      filter: "Filtrer Tout",
      inStock: "En Stock",
      loading: "Chargement du catalogue...",
    },
product: {
      breadcrumbShop: "Boutique",
      noImage: "Aucune image disponible",
      related: "Produits Similaires",
      vat: "TTC",
      inStock: "En Stock",
      
      series: "Série Professionnelle",
      warranty: "Garantie 2 Ans",
      
      tabSpecs: "Spécifications",
      tabFeatures: "Fonctionnalités",
      tabBox: "Dans la Boîte",
      
      noSpecs: "Aucune spécification disponible pour cette unité.",
      noFeatures: "Aucune fonctionnalité listée.",
      noContent: "Contenu non listé.",
      defaultDesc: "Conçu pour une opération autonome et une précision industrielle.",
      
      techHighlights: "Points Forts Techniques"
    },
    technology: {
      hero: {
        badge: "Électrolyse Brevetée",
        titleLine1: "La Pureté par la",
        titleLine2: "Physique.",
        description: "Nous avons remplacé le mélange d'acides dangereux par une tension de précision. Le résultat est une solution de dioxyde de chlore pure à 99,9 %, exempte de contaminants et de sous-produits."
      },
      comparison: {
        oldTitle: "L'Ancienne Méthode",
        oldDesc: "Le « mélange manuel » traditionnel implique de combiner du chlorite de sodium avec de l'acide chlorhydrique. Cette réaction incontrôlée laisse des résidus acides dans votre solution finale et libère des vapeurs dangereuses.",
        oldPoints: [
          "Résidus Acides Élevés",
          "Fuites de Vapeurs Toxiques",
          "PPM Incohérents"
        ],
        newBadge: "Technologie Gen-1",
        newTitle: "La Méthode Dioxera",
        newDesc: "Notre générateur utilise la Nano-Électrolyse pour activer la solution précurseur. Le gaz pur est généré dans une chambre hermétiquement scellée et infusé dans de l'eau distillée.",
        newPoints: [
          "Zéro Résidu Acide",
          "Sécurité Hermétique",
          "Exactement 3000 PPM"
        ]
      },
      steps: {
        heading: "Le Cycle d'Activation",
        step1Title: "Séparation Électrolytique",
        step1Desc: "Un courant précis à basse tension est appliqué à la solution de chlorite de sodium. Cela sépare la molécule de dioxyde de chlore sans nécessiter d'activateur acide agressif.",
        step2Title: "Transfert de Gaz",
        step2Desc: "Le gaz ClO2 pur est libéré dans le système. Contrairement aux liquides, le gaz est intrinsèquement pur. Il traverse un pont en silicone haute pureté, laissant tous les sels lourds et impuretés dans la chambre de réaction.", // "médical" -> "haute pureté"
        step3Title: "Infusion Moléculaire",
        step3Desc: "Le gaz est capturé dans de l'eau distillée refroidie jusqu'à saturation à exactement 3000 PPM. Les capteurs du système détectent la saturation et arrêtent automatiquement le processus.",
      },
      specs: {
        chamber: "Chambre de Réaction",
        chamberVal: "Verre Borosilicaté 3.3",
        electrodes: "Électrodes",
        electrodesVal: "Titane Grade 2", // "Qualité Médicale" -> "Grade 2"
        seals: "Joints",
        sealsVal: "Viton™ Résistant aux Chimiques",
        calibration: "Calibration",
        calibrationVal: "Photo-Capteur Numérique"
      },
      cta: {
        title: "Prêt à passer au niveau supérieur ?",
        btn: "Acheter le Système Gen-1"
      }
    },
    about: {
      hero: {
        est: "Est. 2024",
        titleLine1: "Nous construisons",
        titleLine2: "l'avenir de l'assainissement.",
        description: "Dioxera a été fondée sur une prémisse simple : la pureté de qualité industrielle doit être accessible à tous. Nous concevons des systèmes automatisés qui éliminent le danger et les approximations de la génération de dioxyde de chlore."
      },
      story: {
        location: "Bruxelles, Belgique", // Updated Location
        hq: "Siège Mondial",
        quote: "\"Nous avons vu un marché rempli de kits de mélange manuel dangereux et de solutions instables. Nous savions qu'il devait y avoir un meilleur moyen — un moyen d'utiliser l'ingénierie de précision pour garantir la sécurité.\"",
        founderRole: "Fondateur & PDG",
        heading: "Du Laboratoire au Salon.",
        p1: "Pendant des décennies, la génération de dioxyde de chlore (CDL) de haute pureté était un processus réservé aux chimistes industriels. Cela impliquait des acides dangereux, des vapeurs toxiques et des contrôles de température précis impossibles à reproduire à la maison.",
        p2Part1: "Dioxera a changé cela. En miniaturisant le processus d'activation électrolytique utilisé dans le traitement de l'eau municipal, nous avons créé la ",
        p2Part2: "Série Gen-1",
        p2Part3: ".",
        p3: "Aujourd'hui, nous sommes fiers de servir plus de 5 000 clients à travers l'Europe et l'Amérique du Nord, en leur fournissant les outils pour générer une pureté de qualité laboratoire à la demande.", // "médicale" -> "laboratoire"
        stats: {
          purity: "Degré de Pureté",
          patents: "Brevets Déposés",
          support: "Support Mondial",
          warranty: "Garantie"
        }
      },
      values: {
        heading: "Nos Principes Fondamentaux",
        subheading: "Nous ne prenons aucun raccourci. Chaque appareil que nous construisons est un témoignage de ces trois valeurs non négociables.",
        v1Title: "La Précision d'Abord",
        v1Desc: "En chimie, « à peu près » est dangereux. Nos capteurs sont calibrés avec une tolérance de 0,01 % pour garantir que votre solution est exactement à 3000 PPM.",
        v2Title: "Sécurité par Conception",
        v2Desc: "Nous éliminons le risque par l'ingénierie. Joints hermétiques, verrous pour enfants et arrêt automatique protègent vous et votre famille des accidents.",
        v3Title: "Durabilité",
        v3Desc: "Nous construisons pour la longévité, pas pour l'obsolescence. Nos composants en verre borosilicaté et en acier inoxydable sont conçus pour durer toute une vie."
      },
      cta: {
        title: "Rejoignez le mouvement.",
        desc: "Découvrez la différence du design suisse. Cessez de vous contenter de solutions impures.", // "ingénierie suisse" -> "design suisse"
        btn1: "Voir Nos Produits",
        btn2: "Contacter le Support"
      }
    },
    contact: {
      hero: {
        titleStart: "Contactez",
        titleEnd: "Nous.",
        desc: "Notre équipe de support mondial est disponible pour vous aider avec les spécifications techniques, l'expédition et les demandes de maintenance."
      },
      info: {
        emailLabel: "Email",
        hqLabel: "Siège Social",
        hqValue: "Rue de la Presse 4-1000 Bruxelles\nEVER CARE EUROPE SRL" // Updated Address
      },
      success: {
        title: "Message Reçu",
        desc: "Merci d'avoir contacté Dioxera. Notre équipe de support répondra à votre demande sous 24 heures.",
        btn: "Envoyer un autre message"
      },
        form: {
        nameLabel: "Nom Complet",
        namePlaceholder: "Jean Dupont",
        emailLabel: "Adresse Email",
        emailPlaceholder: "jean@exemple.com",
        phoneLabel: "Numéro de téléphone", // NEW
        phonePlaceholder: "+33 6 12 34 56 78", // NEW
        subjectLabel: "Sujet",
        subjectPlaceholder: "Sélectionnez un sujet...", // Changed
        subjectOptions: { // NEW OPTIONS
          general: "Demande générale",
          support: "Support technique",
          sales: "Ventes et commandes",
          partnership: "Partenariat",
          other: "Autre"
        },
        messageLabel: "Message",
        messagePlaceholder: "Votre message...",
        btnSending: "ENVOI EN COURS...",
        btnSend: "ENVOYER LE MESSAGE",
        errorGeneric: "Une erreur s'est produite. Veuillez réessayer."
      }
    },
    login: {
      createAccount: "Créer un compte",
      accessPortal: "Accéder au Portail",
      resetTitle: "Réinitialiser le mot de passe",
      environment: "Environnement Sécurisé Dioxera",
      emailLabel: "Email",
      passwordLabel: "Mot de passe",
      signUpBtn: "S'inscrire",
      loginBtn: "Connexion",
      resetBtn: "Envoyer les instructions",
      forgotPassword: "Mot de passe oublié ?",
      toggleToLogin: "Déjà un compte ? Connexion",
      toggleToSignUp: "Nouveau client ? Créer un compte",
      backToLogin: "Retour à la connexion",
      returnHome: "Retour à l'accueil",
      alertSignup: "Vérifiez votre email pour confirmer l'inscription !",
      alertReset: "Vérifiez votre email pour le lien de réinitialisation !",
      loading: "Chargement..."
    },
    resetPassword: {
      title: "Définir un nouveau mot de passe",
      desc: "Veuillez entrer votre nouveau mot de passe ci-dessous.",
      passwordLabel: "Nouveau mot de passe",
      confirmLabel: "Confirmer le mot de passe",
      btn: "Mettre à jour",
      success: "Mot de passe mis à jour avec succès !",
      errorMatch: "Les mots de passe ne correspondent pas.",
      redirecting: "Redirection vers la connexion...",
      placeholder: "••••••••"
    },
    checkout: {
      gate: {
        title: "Comment souhaitez-vous payer ?",
        hasAccount: "Vous avez un compte ?",
        loginDesc: "Connectez-vous pour accéder à vos adresses et historique.",
        loginBtn: "Connexion",
        createBtn: "Créer un compte",
        guestTitle: "Paiement Invité",
        guestDesc: "Aucun compte requis. Vous pourrez en créer un plus tard.",
        guestBtn: "Continuer en invité"
      },
      auth: {
        welcome: "Bon retour",
        create: "Créer un compte",
        back: "Retour",
        email: "Email",
        password: "Mot de passe",
        signingIn: "Connexion...",
        loginAndCheckout: "Connexion & Paiement",
        creating: "Création...",
        registerAndCheckout: "S'inscrire & Payer"
      },
      main: {
        secureCheckout: "PAIEMENT SÉCURISÉ",
        empty: "Votre panier est vide.",
        return: "Retourner à la boutique"
      },
      summary: {
        title: "Résumé de la commande",
        empty: "Panier vide",
        subtotal: "Sous-total",
        shipping: "Livraison",
        free: "GRATUIT",
        tax: "TVA (Incluse)",
        total: "Total à payer",
        logistics: "Logistique Mondiale" // Removed Swiss
      },
      form: {
        contact: "Coordonnées",
        email: "Adresse Email",
        phone: "Numéro de téléphone",
        shipping: "Adresse de livraison",
        firstName: "Prénom",
        lastName: "Nom",
        street: "Adresse (Rue)",
        city: "Ville",
        zip: "Code Postal",
        country: "Pays / Région",
        selectCountry: "Sélectionner un pays...",
        billingSame: "L'adresse de facturation est identique",
        billingDiff: "Décochez pour saisir une autre adresse",
        billingTitle: "Détails de facturation",
        paymentTitle: "Moyen de Paiement",
        cc: "Carte Bancaire",
        paypal: "PayPal",
        bank: "Virement Bancaire",
        bankInstructions: "Instructions Virement",
        bankDesc: "Vous recevrez notre IBAN et la facture par email. Expédition après réception des fonds.",
        pay: "PAYER",
        placeOrder: "COMMANDER",
        processing: "TRAITEMENT..."
      }
    },
    success: {
      titleBank: "Commande Effectuée !",
      titleCard: "Paiement Réussi !",
      orderRecorded: "La commande #{id} a été enregistrée.",
      cardMessage: "Merci pour votre achat. Un email de confirmation vous a été envoyé.",
      downloadBtn: "Télécharger la Facture",
      bankTitle: "Coordonnées Bancaires",
      pending: "Paiement en Attente",
      reported: "Paiement Signalé",
      confirmedBadge: "Confirmé",
      bankInstructions: "Veuillez copier les détails ci-dessous ou utiliser le lien Wise.",
      crucial: "Important",
      useRef: "Utilisez #{ref} comme référence.",
      copy: {
        iban: "IBAN",
        bic: "BIC / SWIFT",
        ref: "Référence"
      },
      payWise: "Payer via Wise",
      iHavePaid: "J'ai effectué le paiement",
      thankYou: "Merci !",
      notifyMessage: "Nous avons informé notre équipe de surveiller votre virement. Votre commande sera expédiée dès réception des fonds.",
      downloadPdf: "Télécharger la Facture PDF",
      returnHome: "Retour à l'accueil",
      continueShopping: "Continuer les achats"
    },
    dashboard: {
      title: "Mon Compte",
      signOut: "Déconnexion",
      orders: {
        title: "Historique des Commandes",
        empty: "Aucune commande trouvée.",
        startShopping: "Commencer vos achats",
        invoice: "Facture",
        total: "Total",
        paidCard: "Payé par Carte",
        paidPaypal: "Payé via PayPal",
        bankTransfer: "Virement Bancaire"
      },
      support: {
        title: "Support",
        newTicket: "+ Nouveau Ticket",
        cancel: "Annuler",
        subjectPh: "Sujet",
        messagePh: "Comment pouvons-nous aider ?",
        submit: "Envoyer la demande",
        chatPh: "Écrivez un message...",
        status: {
          open: "Ouvert",
          resolved: "Résolu",
          closed: "Fermé"
        }
      }
    },
    admin: {
      header: {
        title: "PANNEAU ADMIN",
        logout: "Déconnexion"
      },
      tabs: {
        orders: "Commandes",
        tickets: "Tickets",
        users: "Utilisateurs",
        qr: "QR Dynamique"
      },
      orders: {
        id: "ID",
        customer: "Client",
        total: "Total",
        status: "Statut",
        action: "Action",
        view: "Voir",
        statusOptions: {
          pending: "En attente",
          paid: "Payé",
          shipped: "Expédié",
          cancelled: "Annulé"
        }
      },
      tickets: {
        from: "De"
      },
      qr: {
        titleEdit: "Modifier la Destination",
        titleNew: "Créer Nouveau QR",
        label: "Libellé (Interne)",
        dest: "URL de Destination (Tout lien)",
        btnUpdate: "Mettre à jour",
        btnCreate: "Créer",
        btnCancel: "Annuler",
        note: "* Vous pouvez modifier l'URL de destination à tout moment. L'image QR reste valide.",
        tableLabel: "Libellé",
        tableSmart: "Lien Intelligent (À Imprimer)",
        tableDest: "Redirige vers (Modifiable)",
        tableScans: "Scans",
        tableActions: "Actions",
        empty: "Aucun QR Code créé. Créez-en un ci-dessus !"
      },
      modalOrder: {
        title: "Commande #",
        currentStatus: "Statut Actuel",
        items: "Articles",
        customer: "Client",
        shipping: "Livraison",
        downloadInvoice: "Télécharger Facture Officielle PDF",
        paidVia: "Payé via"
      },
      chat: {
        customer: "Client",
        placeholder: "Écrivez une réponse...",
        open: "Ouvert",
        resolved: "Résolu"
      }
    }
  },
};