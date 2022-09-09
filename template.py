from pathlib import Path

from youwol.pipelines.pipeline_typescript_weback_npm import Template, PackageType, Dependencies, \
    RunTimeDeps, generate_template

template = Template(
    path=Path(__file__).parent,
    type=PackageType.Library,
    name="@youwol/grapes-text-editors",
    version="0.0.2-wip",
    shortDescription="Various components for grapes to edit text (markdown, latex, etc) from YouWol team.",
    author="greinisch@youwol.com",
    dependencies=Dependencies(
        runTime=RunTimeDeps(
            load={
                '@youwol/flux-view': "^0.1.1",
                'rxjs': "^6.5.5",
                '@youwol/http-clients': "^0.1.12",
                '@youwol/fv-tabs': "^0.1.2",
                '@youwol/fv-group': "^0.1.1",
            },
            differed={
                #  this is actually not used (only for type declarations)
                'grapesjs': "0.18.3"
            }
        ),
        devTime={
        }
    ),
    userGuide=True
    )

generate_template(template)
