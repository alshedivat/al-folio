---
layout: page
title: Query-Free Adversarial Attacks on Diffusion Models
description: ICML 2025 Research on Image-to-Image Model Vulnerabilities
img: assets/img/4.jpg
importance: 7
category: research
related_publications: rico2025adversarial
github: https://github.com/MarioRicoIbanez
---

## 🔥 Cutting-Edge AI Security Research

**Challenge**: Modern image-to-image diffusion models power millions of applications, but how vulnerable are they to adversarial attacks? Can we fool state-of-the-art generative AI systems without even querying the models directly?

**My Solution**: Developed **query-free adversarial attacks** that exploit publicly available encoders to generate imperceptible perturbations, causing dramatic failures in image editing pipelines while maintaining complete stealth.

### 🎯 **Research Impact & Breakthrough Findings**

- **Sub-perceptual attacks**: Perturbations as small as **8/255** pixels completely fool production-scale diffusion models
- **Universal vulnerability**: Affects **InstructPix2Pix**, **Kandinsky**, **Stable Diffusion Upscaler**, and enhanced variants
- **Defense failure**: Even **RobustCLIP** and high-quality training data provide **zero protection**
- **ICML 2025 submission**: First comprehensive study of encoder-space attacks across diffusion architectures

### 🏗️ **Advanced Research Methodology**

#### **Query-Free Attack Framework**
```python
class QueryFreeAdversarialAttack:
    def __init__(self, target_encoder='clip', attack_budget=8/255):
        # Auto-PGD optimization without model access
        self.optimizer = AutoProjectedGradientDescent(
            epsilon=attack_budget,
            norm='linf',
            adaptive_step_size=True,
            momentum_accumulation=True
        )
        
        # Public encoder targeting (CLIP/VAE)
        self.encoder = load_public_encoder(target_encoder)
        self.distance_metric = CosineSimilarity()
        
    def craft_perturbation(self, input_image, instruction):
        # Maximize latent space disruption
        delta = self.optimizer.optimize(
            objective=lambda x: self.distance_metric(
                self.encoder(input_image),
                self.encoder(input_image + x)
            ),
            constraints=[L_inf_ball(self.epsilon)],
            iterations=100
        )
        
        return self.project_to_valid_range(input_image + delta)
    
    def evaluate_attack_success(self, original, perturbed, generated):
        # Multi-modal evaluation framework
        return {
            'clip_similarity': self.clip_similarity(original, generated),
            'instruction_fidelity': self.text_image_alignment(instruction, generated),
            'psnr_quality': self.compute_psnr(original, perturbed),
            'llm_judge_score': self.gemma_evaluation(original, perturbed, generated)
        }
```

#### **Comprehensive Model Evaluation**
- **InstructPix2Pix**: VAE-based architecture with instruction-guided editing
- **InstructPix2Pix-CLIP**: Enhanced version with contrastively curated training data
- **Kandinsky**: CLIP-based architecture with different embedding approach
- **RobustCLIP Kandinsky**: Adversarially trained encoder integration
- **Stable Diffusion Upscaler**: 4× super-resolution diffusion model

### 📊 **Quantitative Research Results**

<div class="row">
    <div class="col-sm-6 mt-3 mt-md-0">
        <h4>Attack Effectiveness Analysis</h4>
        <table class="table table-sm">
            <tr><th>ε Budget</th><th>CLIP Similarity Drop</th><th>PSNR Quality</th><th>Success Rate</th></tr>
            <tr><td>1/255</td><td>11.7%</td><td>50.8 dB</td><td>67%</td></tr>
            <tr><td>8/255</td><td>18.9%</td><td>34.0 dB</td><td>89%</td></tr>
            <tr><td>16/255</td><td>25.6%</td><td>27.9 dB</td><td><strong>96%</strong></td></tr>
            <tr><td>32/255</td><td>32.3%</td><td>22.0 dB</td><td>98%</td></tr>
        </table>
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        <h4>Cross-Architecture Vulnerability</h4>
        <ul>
            <li><strong>VAE-based models</strong>: Highly vulnerable to L2 distance attacks</li>
            <li><strong>CLIP-based models</strong>: Equal vulnerability to cosine/L2 attacks</li>
            <li><strong>Enhanced training</strong>: No improvement in adversarial robustness</li>
            <li><strong>Robust encoders</strong>: Completely ineffective defense mechanism</li>
        </ul>
    </div>
</div>

### 🔬 **Novel Research Contributions**

#### **Systematic Vulnerability Analysis**
- **Perturbation Budget Study**: Comprehensive analysis across ε ∈ {1, 8, 16, 32, 64, 128, 192, 255}/255
- **Encoder Architecture Impact**: First study comparing VAE vs. CLIP encoder vulnerabilities
- **Defense Mechanism Evaluation**: Rigorous testing of existing robustness approaches
- **Multi-Modal Assessment**: CLIP embeddings + LLM judge + perceptual quality metrics

#### **Attack Optimization Innovations**
```python
# Advanced Auto-PGD with adaptive scheduling
def auto_pgd_attack(self, x, target_encoder):
    """Automated adversarial optimization without manual tuning"""
    
    # Adaptive step size scheduling
    step_size = self.initial_step_size
    momentum = torch.zeros_like(x)
    best_perturbation = None
    best_loss = float('-inf')
    
    for iteration in range(self.max_iterations):
        # Compute gradient with momentum
        grad = self.compute_gradient(x, target_encoder)
        momentum = self.momentum_decay * momentum + grad
        
        # Adaptive step size adjustment
        if iteration % 10 == 0:
            step_size = self.adjust_step_size(step_size, loss_history)
        
        # Projected gradient step
        perturbation = self.project_linf_ball(
            x + step_size * torch.sign(momentum), 
            self.epsilon
        )
        
        # Track best perturbation
        current_loss = self.evaluate_attack_loss(perturbation)
        if current_loss > best_loss:
            best_loss = current_loss
            best_perturbation = perturbation.clone()
    
    return best_perturbation
```

### 🏭 **Production-Scale Evaluation**

#### **Comprehensive Dataset Analysis**
- **InstructPix2Pix Dataset**: 100K+ paired edit examples
- **Multi-Task Evaluation**: Style transfer, object addition, scene modification
- **Statistical Significance**: 10+ random seeds, confidence intervals reported
- **Reproducible Research**: Complete experimental pipeline and hyperparameter logs

#### **Advanced Evaluation Metrics**
- **Semantic Preservation**: CLIP similarity between original and generated images
- **Instruction Adherence**: Text-image alignment scores for edit fidelity
- **Perceptual Quality**: PSNR and LPIPS for human-perceivable distortions
- **LLM Judge Assessment**: Gemma-3-4B model for qualitative evaluation

### 📈 **Security Implications & Impact**

**Critical Vulnerabilities Discovered**:
- **Stealth Attacks**: Imperceptible perturbations (ε < 16/255) cause complete model failures
- **Universal Transferability**: Attacks crafted on public encoders transfer to production systems
- **Defense Inadequacy**: Current robustness techniques provide zero protection
- **Scalability Concerns**: Attack complexity remains constant regardless of model size

**Real-World Attack Scenarios**:
- **Content Moderation Bypass**: Generate inappropriate content through adversarial image editing
- **Model Integrity Attacks**: Cause systematic failures in deployed image processing pipelines
- **Privacy Violations**: Manipulate identity-preserving image transformations
- **IP Theft**: Reverse-engineer proprietary diffusion model behaviors

### 🛠️ **Technical Implementation**

**Core Technologies**: PyTorch, HuggingFace Transformers, Auto-PGD, CLIP, Stable Diffusion  
**Evaluation Framework**: Custom metrics pipeline, statistical testing, multi-modal assessment  
**Reproducibility**: Complete experimental scripts, hyperparameter configurations, result logging  
**Scalability**: Distributed evaluation across multiple GPU clusters, batch processing optimization  

### 🏆 **Research Recognition & Impact**

- **ICML 2025 Submission** - Under review at top-tier machine learning conference
- **Novel Attack Methodology** - First systematic study of query-free diffusion attacks
- **Security Community Impact** - Highlighting critical vulnerabilities in production AI systems
- **Defense Research Catalyst** - Motivating next generation of adversarial robustness research

### 🔍 **Future Research Directions**

- **Certified Defenses**: Developing provably robust diffusion model architectures
- **Attack Detection**: Real-time adversarial perturbation identification systems
- **Model Hardening**: Training procedures specifically designed for adversarial robustness
- **Cross-Modal Security**: Extending attack analysis to text-to-image and video generation

---

*This research demonstrates the critical security vulnerabilities in modern generative AI systems, contributing essential knowledge for building more robust and trustworthy AI technologies. The work directly addresses safety concerns that impact millions of users of diffusion-based applications.*
