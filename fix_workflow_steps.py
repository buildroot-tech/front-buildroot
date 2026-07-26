with open("WorkflowSteps_6c35911.tsx", "r") as f:
    content = f.read()

# Add 5th card
target = """  {
    number: "04",
    title: "Ship",
    description:
      "Deploy, monitor, and scale with absolute confidence. Your product hits the market like a sledgehammer.",
    color: "var(--border)", // Very dark
    textColor: "var(--text-inverse)",
  },
];"""

replacement = """  {
    number: "04",
    title: "Ship",
    description:
      "Deploy, monitor, and scale with absolute confidence. Your product hits the market like a sledgehammer.",
    color: "var(--border)", // Very dark
    textColor: "var(--text-inverse)",
  },
  {
    number: "05",
    title: "Optimization",
    description: "Continuous monitoring, performance tuning, and scaling optimizations.",
    color: "#000000",
    textColor: "var(--text-inverse)",
  },
];"""
content = content.replace(target, replacement)

# Add dict param
target2 = """export function WorkflowSteps() {"""
replacement2 = """interface WorkflowStepsProps {
  dict?: any;
}

export function WorkflowSteps({ dict }: WorkflowStepsProps) {"""
content = content.replace(target2, replacement2)

# Make "Our Process" thin and remove <br/>
target3 = """              <h2 className="font-display text-6xl font-bold uppercase leading-none tracking-tighter sm:text-7xl lg:text-8xl xl:text-9xl">
                Our<br />Process
              </h2>"""
replacement3 = """              <h2 className="font-display text-[clamp(2.5rem,6vw,8rem)] font-light uppercase leading-none tracking-tighter">
                Our Process
              </h2>"""
content = content.replace(target3, replacement3)

# Add dictionary lookups
target4 = """              <p className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                How We Work
              </p>"""
replacement4 = """              <p className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                {dict?.home?.process?.subtitle || "How We Work"}
              </p>"""
content = content.replace(target4, replacement4)

target5 = """              <h2 className="font-display text-[clamp(2.5rem,6vw,8rem)] font-light uppercase leading-none tracking-tighter">
                Our Process
              </h2>"""
replacement5 = """              <h2 className="font-display text-[clamp(2.5rem,6vw,8rem)] font-light uppercase leading-none tracking-tighter">
                {dict?.home?.process?.title || "Our Process"}
              </h2>"""
content = content.replace(target5, replacement5)

target6 = """        <div>
          <h3 className="font-display text-4xl font-bold uppercase tracking-tight md:text-6xl lg:text-7xl mb-6">
            {step.title}
          </h3>
          <p className="font-mono text-lg max-w-2xl md:text-2xl leading-relaxed opacity-90">
            {step.description}
          </p>
        </div>"""
replacement6 = """        <div>
          <h3 className="font-display text-4xl font-bold uppercase tracking-tight md:text-6xl lg:text-7xl mb-6">
            {step.dictKey && dict?.home?.process?.steps?.[step.dictKey]?.title ? dict.home.process.steps[step.dictKey].title : step.title}
          </h3>
          <p className="font-mono text-lg max-w-2xl md:text-2xl leading-relaxed opacity-90">
            {step.dictKey && dict?.home?.process?.steps?.[step.dictKey]?.description ? dict.home.process.steps[step.dictKey].description : step.description}
          </p>
        </div>"""
content = content.replace(target6, replacement6)

# Need to inject dictKey into steps array
target7 = """  {
    number: "01",
    title: "Discovery","""
replacement7 = """  {
    number: "01",
    dictKey: "discovery",
    title: "Discovery","""
content = content.replace(target7, replacement7)
content = content.replace("""  {
    number: "02",
    title: "Architecture",""", """  {
    number: "02",
    dictKey: "architecture",
    title: "Architecture",""")
content = content.replace("""  {
    number: "03",
    title: "Build",""", """  {
    number: "03",
    dictKey: "build",
    title: "Build",""")
content = content.replace("""  {
    number: "04",
    title: "Ship",""", """  {
    number: "04",
    dictKey: "ship",
    title: "Ship",""")
content = content.replace("""  {
    number: "05",
    title: "Optimization",""", """  {
    number: "05",
    dictKey: "optimization",
    title: "Optimization",""")

# Change 400vh to 500vh to accommodate 5 steps
content = content.replace('h-[400vh]', 'h-[500vh]')

# Change index scaling for 5 cards: start = index * 0.20
target8 = """  const start = index * 0.25;
  const end = start + 0.25;"""
replacement8 = """  const start = index * 0.20;
  const end = start + 0.20;"""
content = content.replace(target8, replacement8)

# Pass dict to StepCard if we want, but wait, StepCard is not accessing dict directly. Let's pass it!
target9 = """              <StepCard
                key={step.number}
                step={step}
                index={index}
                scrollYProgress={scrollYProgress}
              />"""
replacement9 = """              <StepCard
                key={step.number}
                step={step}
                index={index}
                scrollYProgress={scrollYProgress}
                dict={dict}
              />"""
content = content.replace(target9, replacement9)

target10 = """function StepCard({ step, index, scrollYProgress }: any) {"""
replacement10 = """function StepCard({ step, index, scrollYProgress, dict }: any) {"""
content = content.replace(target10, replacement10)


with open("components/home/WorkflowSteps.tsx", "w") as f:
    f.write(content)
