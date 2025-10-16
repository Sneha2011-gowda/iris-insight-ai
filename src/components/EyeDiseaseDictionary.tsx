import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Eye, AlertTriangle, Info, Target } from "lucide-react";
import { useState } from "react";

interface Disease {
  id: string;
  name: string;
  category: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
}

export const EyeDiseaseDictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const diseases: Disease[] = [
    {
      id: "dr",
      name: "Diabetic Retinopathy",
      category: "Retinal Disease",
      severity: "high",
      description: "A diabetes complication that affects eyes. It's caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina).",
      symptoms: [
        "Spots or dark strings floating in vision (floaters)",
        "Blurred vision",
        "Fluctuating vision",
        "Dark or empty areas in vision",
        "Vision loss"
      ],
      causes: [
        "High blood sugar levels",
        "Long-term diabetes",
        "High blood pressure",
        "High cholesterol",
        "Pregnancy"
      ],
      treatment: [
        "Anti-VEGF injection therapy",
        "Laser photocoagulation",
        "Vitrectomy surgery",
        "Blood sugar control",
        "Regular eye examinations"
      ],
      prevention: [
        "Maintain good blood sugar control",
        "Monitor blood pressure",
        "Regular eye exams",
        "Healthy diet and exercise",
        "Avoid smoking"
      ]
    },
    {
      id: "glaucoma",
      name: "Glaucoma",
      category: "Optic Nerve Disease",
      severity: "critical",
      description: "A group of eye conditions that damage the optic nerve, often caused by abnormally high pressure in your eye. It's one of the leading causes of blindness.",
      symptoms: [
        "Patchy blind spots in peripheral or central vision",
        "Tunnel vision in advanced stages",
        "Severe headache",
        "Eye pain",
        "Nausea and vomiting",
        "Blurred vision",
        "Halos around lights"
      ],
      causes: [
        "High intraocular pressure",
        "Poor blood flow to optic nerve",
        "High blood pressure",
        "Family history",
        "Age over 60"
      ],
      treatment: [
        "Prescription eye drops",
        "Oral medications",
        "Laser therapy",
        "Surgery (trabeculectomy)",
        "Drainage implants"
      ],
      prevention: [
        "Regular comprehensive eye exams",
        "Know your family history",
        "Exercise safely",
        "Take prescribed eye drops regularly",
        "Wear eye protection"
      ]
    },
    {
      id: "cataract",
      name: "Cataract",
      category: "Lens Disease",
      severity: "medium",
      description: "A clouding of the normally clear lens of the eye. It's like looking through a foggy or dusty car windshield.",
      symptoms: [
        "Clouded, blurred or dim vision",
        "Increasing difficulty with vision at night",
        "Sensitivity to light and glare",
        "Seeing halos around lights",
        "Frequent changes in eyeglass prescription",
        "Fading or yellowing of colors",
        "Double vision in a single eye"
      ],
      causes: [
        "Aging",
        "Diabetes",
        "Excessive UV light exposure",
        "Smoking",
        "Obesity",
        "High blood pressure",
        "Eye injury or inflammation"
      ],
      treatment: [
        "Updated eyeglass prescription",
        "Magnifying lenses",
        "Brighter lighting",
        "Cataract surgery (lens replacement)",
        "Anti-glare sunglasses"
      ],
      prevention: [
        "Protect eyes from UV light",
        "Manage health conditions",
        "Don't smoke",
        "Eat fruits and vegetables",
        "Regular eye examinations"
      ]
    },
    {
      id: "amd",
      name: "Age-Related Macular Degeneration (AMD)",
      category: "Retinal Disease",
      severity: "high",
      description: "An eye disease that can blur central vision due to damage to the macula, a small area near the center of the retina.",
      symptoms: [
        "Visual distortions (straight lines appear bent)",
        "Reduced central vision",
        "Difficulty recognizing faces",
        "Need for brighter light when reading",
        "Difficulty adapting to low light levels",
        "Blurriness in printed words",
        "Central blurred spot in vision"
      ],
      causes: [
        "Age over 50",
        "Smoking",
        "Family history",
        "Race (more common in Caucasians)",
        "Obesity",
        "Cardiovascular disease"
      ],
      treatment: [
        "Anti-VEGF therapy",
        "Photodynamic therapy",
        "Laser therapy",
        "Vitamin supplements (AREDS2)",
        "Low vision aids"
      ],
      prevention: [
        "Don't smoke",
        "Exercise regularly",
        "Maintain healthy blood pressure",
        "Eat leafy greens and fish",
        "Wear sunglasses"
      ]
    },
    {
      id: "retinal-detachment",
      name: "Retinal Detachment",
      category: "Retinal Disease",
      severity: "critical",
      description: "A medical emergency where the retina pulls away from its normal position. Without prompt treatment, it can cause permanent vision loss.",
      symptoms: [
        "Sudden appearance of floaters",
        "Flashes of light in one or both eyes",
        "Gradually reduced peripheral vision",
        "Curtain-like shadow over visual field",
        "Sudden decrease in vision"
      ],
      causes: [
        "Aging and posterior vitreous detachment",
        "Eye injury",
        "Advanced diabetes",
        "Previous eye surgery",
        "Extreme nearsightedness",
        "Family history"
      ],
      treatment: [
        "Laser surgery (photocoagulation)",
        "Freezing (cryopexy)",
        "Pneumatic retinopexy",
        "Scleral buckle",
        "Vitrectomy"
      ],
      prevention: [
        "Regular eye exams",
        "Wear protective eyewear",
        "Manage diabetes",
        "Immediate attention to warning signs",
        "Control blood sugar if diabetic"
      ]
    },
    {
      id: "conjunctivitis",
      name: "Conjunctivitis (Pink Eye)",
      category: "Conjunctival Disease",
      severity: "low",
      description: "An inflammation or infection of the conjunctiva, the transparent membrane that lines the eyelid and covers the white part of the eyeball.",
      symptoms: [
        "Redness in the white of the eye",
        "Increased tear production",
        "Thick yellow discharge",
        "Itchy eyes",
        "Gritty feeling in eyes",
        "Crusting of eyelids"
      ],
      causes: [
        "Viral infection",
        "Bacterial infection",
        "Allergies",
        "Chemical splash",
        "Foreign object in eye",
        "Blocked tear duct in babies"
      ],
      treatment: [
        "Antibiotic eye drops (bacterial)",
        "Antihistamine eye drops (allergic)",
        "Artificial tears",
        "Warm compresses",
        "Good hygiene practices"
      ],
      prevention: [
        "Wash hands frequently",
        "Don't touch eyes",
        "Don't share personal items",
        "Change pillowcases regularly",
        "Clean contact lenses properly"
      ]
    },
    {
      id: "dry-eye",
      name: "Dry Eye Syndrome",
      category: "Tear Film Disease",
      severity: "low",
      description: "A common condition that occurs when tears aren't able to provide adequate lubrication for the eyes.",
      symptoms: [
        "Stinging or burning sensation",
        "Stringy mucus in or around eyes",
        "Light sensitivity",
        "Eye redness",
        "Watery eyes",
        "Blurred vision",
        "Eye fatigue"
      ],
      causes: [
        "Aging",
        "Certain medications",
        "Medical conditions (diabetes, thyroid)",
        "Environmental factors",
        "Extended screen time",
        "Contact lens wear"
      ],
      treatment: [
        "Artificial tears",
        "Prescription eye drops",
        "Punctal plugs",
        "Warm compresses",
        "Lid massage",
        "Omega-3 supplements"
      ],
      prevention: [
        "Take screen breaks",
        "Use humidifier",
        "Wear sunglasses outdoors",
        "Stay hydrated",
        "Position screens below eye level"
      ]
    },
    {
      id: "keratitis",
      name: "Keratitis",
      category: "Corneal Disease",
      severity: "high",
      description: "An inflammation of the cornea that can be caused by infection or injury. Can lead to serious complications if not treated.",
      symptoms: [
        "Eye redness",
        "Eye pain",
        "Excessive tears or discharge",
        "Difficulty opening eyelid",
        "Blurred vision",
        "Light sensitivity",
        "Feeling of something in the eye"
      ],
      causes: [
        "Bacterial infection",
        "Viral infection (herpes)",
        "Fungal infection",
        "Parasitic infection",
        "Eye injury",
        "Contaminated contact lenses"
      ],
      treatment: [
        "Antibiotic eye drops",
        "Antiviral medications",
        "Antifungal eye drops",
        "Corticosteroid eye drops",
        "Corneal transplant (severe cases)"
      ],
      prevention: [
        "Proper contact lens care",
        "Don't sleep in contacts",
        "Wash hands before touching eyes",
        "Use only sterile solutions",
        "Remove contacts if eyes are red"
      ]
    },
    {
      id: "uveitis",
      name: "Uveitis",
      category: "Uveal Disease",
      severity: "high",
      description: "Inflammation of the uvea, the middle layer of the eye. Can damage vital eye tissue and lead to permanent vision loss.",
      symptoms: [
        "Eye redness",
        "Eye pain",
        "Light sensitivity",
        "Blurred vision",
        "Dark floating spots",
        "Decreased vision"
      ],
      causes: [
        "Autoimmune disorders",
        "Inflammatory diseases",
        "Infections",
        "Eye injury",
        "Toxins entering eye",
        "Unknown causes"
      ],
      treatment: [
        "Corticosteroid eye drops",
        "Oral corticosteroids",
        "Immunosuppressive drugs",
        "Antibiotics or antivirals",
        "Mydriatic eye drops",
        "Surgery (severe cases)"
      ],
      prevention: [
        "Manage autoimmune conditions",
        "Treat infections promptly",
        "Regular eye examinations",
        "Wear protective eyewear",
        "Follow treatment plans"
      ]
    },
    {
      id: "pterygium",
      name: "Pterygium",
      category: "Conjunctival Disease",
      severity: "low",
      description: "A growth of fleshy tissue on the conjunctiva that can extend onto the cornea. Often called 'surfer's eye'.",
      symptoms: [
        "Visible growth on eye surface",
        "Redness and inflammation",
        "Dry or gritty feeling",
        "Blurred vision (if affects cornea)",
        "Feeling of foreign body"
      ],
      causes: [
        "Chronic UV light exposure",
        "Dry, dusty conditions",
        "Wind exposure",
        "Outdoor work or activities",
        "Living near equator"
      ],
      treatment: [
        "Artificial tears",
        "Steroid eye drops",
        "Decongestant eye drops",
        "Surgical removal (if affecting vision)",
        "Anti-inflammatory medications"
      ],
      prevention: [
        "Wear UV-blocking sunglasses",
        "Wear wide-brimmed hat",
        "Use artificial tears in dry conditions",
        "Avoid excessive sun exposure"
      ]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
      case "high": return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20";
      case "critical": return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
      default: return "bg-muted";
    }
  };

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Eye Disease Dictionary
          </CardTitle>
          <CardDescription>
            Comprehensive information about common eye diseases and conditions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search diseases by name, category, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredDiseases.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No diseases found matching your search.
            </CardContent>
          </Card>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {filteredDiseases.map((disease) => (
              <AccordionItem key={disease.id} value={disease.id} className="border rounded-lg">
                <Card>
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-start justify-between w-full pr-4">
                      <div className="text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{disease.name}</h3>
                          <Badge variant="outline" className={getSeverityColor(disease.severity)}>
                            {disease.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{disease.category}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <CardContent className="space-y-6 pt-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold text-foreground">Description</h4>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {disease.description}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold text-foreground">Symptoms</h4>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {disease.symptoms.map((symptom, idx) => (
                            <li key={idx}>{symptom}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold text-foreground">Causes</h4>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {disease.causes.map((cause, idx) => (
                            <li key={idx}>{cause}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold text-foreground">Treatment Options</h4>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {disease.treatment.map((treatment, idx) => (
                            <li key={idx}>{treatment}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold text-foreground">Prevention</h4>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {disease.prevention.map((prevention, idx) => (
                            <li key={idx}>{prevention}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};
